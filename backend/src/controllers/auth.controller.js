import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import blacklistTokens from "../models/blacklist.model.js";


/**
 * @name registerUser
 * @description register a new user, expects username, email, password in the request
 * @access Public
 */
export const registerUser = async(req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).send({
            message:"Please enter all the details"
        })
    }
    const isUserAlreadyExists = await Users.findOne({
        $or: [{username}, {email}]
    })
    if(isUserAlreadyExists){
        return res.status(400).send({
            message:"Account with this email address or username already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
        username:username,
        email: email, 
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, {expiresIn: "1d"});
    res.cookie("token", token)
    res.status(201).send({
        message: "User registered successfully",
        user:{
            userId: user._id,
            username: user.username,
            email: user.email
        }
    })
    
}


/**
 * @name loginUser
 * @description login user, expects  email, password in the request
 * @access Public
 */

export const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    const user = await Users.findOne({email});
    if(!user){
        return res.status(400).send({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).send({
            message:"Invalid password"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
     },process.env.JWT_SECRET, {expiresIn:"1d"});

     res.cookie("token", token);
     res.status(200).json({
        message:"User logged in successfully",
        user: {
            userId: user._id,
            username: user.username,
            email: user.email
        }
     })
    
}

//logout
export const logoutUser = async (req, res)=>{
    const token = req.cookies.token;
    if(token){
        await blacklistTokens.create({token});
    }
    res.clearCookie("token")
    res.status(200).json({
        message: "Logged out successfully"
    });
}



//getme
export const getMe = async(req, res)=>{
    const user = await Users.findById(req.user.id);
    res.status(200).json({
        message:"User details fetched successfully.",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}