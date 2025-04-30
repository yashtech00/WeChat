import  jwt  from "jsonwebtoken";
import UserModel from "../model/UserSchema";


export const Authenticate = async (req:any,res:any,next:any) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status("401").json({message:"Unauthorized"})
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode || typeof decode === "string") {
            return res.status(401).json({message:"Token is not valid"})
        }
        const user = await UserModel.findById(decode.userId).select("-password")
        if (!user) {
            return res.status(401).json("User not found")
        }
        req.user = user;
        next()
        
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while authenticating" })
    }
}