import path from "path";
import jwt from "jsonwebtoken";

export const generateToken = (userId:string,res:any) => {
    try {

        const token = jwt.sign(
            { _id: userId },
            process.env.JWT_SECRET || "default",
            { expiresIn: '24h' }
        )

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge:24*60*60*1000
        })
        
        return token
    } catch (e:any) {
        console.error(e.message);
        
    }
}