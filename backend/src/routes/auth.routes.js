import { Router } from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST/api/auth/register
 * @description Register a new user
 * @access public
 */

authRouter.route("/register").post(registerUser);

/**
 * @route POST/api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.route("/login").post(loginUser)

/**
 * @route GET/api/auth/logout
 * @description logout user, clear token and add that to the blacklist 
 * @access public
 */
authRouter.route("/logout").get(logoutUser)


/**
 * @route GET/api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.route("/get-me").get(authUser, getMe)


export default authRouter;
