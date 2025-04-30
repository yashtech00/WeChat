import { generateToken } from "../lib/generateToken";
import ChatModel from "../model/ChatSchema";
import UserModel from "../model/UserSchema";
import bcrypt from "bcryptjs"


export const Signup = async(req:any,res:any) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            username,
            email,
            password:hashedPassword
        });
        generateToken(user._id.toString(), res);
        return res.status(200).json({ message: "User account created successfully" }, { data: user });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while signup" });
    }
}


export const Login = async(req:any,res:any) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne(email);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(404).json({ message: "Wrong Password" });
        }
        generateToken(user._id.toString(), res);
        return res.status(200).json({ message: "User account created successfully" }, { data: user });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while Login" });
    }
}

export const message = async(req:any,res:any) => {
    try {


        const chat = await ChatModel.findById();
        return res.status(200).json({message:"Fetch the messages"})
            
    } catch (e) {
        
    }
}