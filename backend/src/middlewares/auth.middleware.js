import jwt from "jsonwebtoken";
import blacklistTokens from "../models/blacklist.model.js";

export const authUser = async(req, res, next)=> {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Token not provided."
        })
    }
    const isTokenBlacklisted = await blacklistTokens.findOne({token})
    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is invalid."
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token."
        })
    }
}