import { generateToken } from "../lib/generateToken";

import UserModel from "../model/UserSchema";
import bcrypt from "bcryptjs"


export const Signup = async(req:any,res:any) => {
    try {
        const {fullname, username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            fullname,
            username,
            email,
            password:hashedPassword
        });
        generateToken(user._id.toString(), res);
        return res.status(200).json({ 
            message: "User account created successfully", 
            data: user 
        });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while signup" });
    }
}


export const Login = async(req:any,res:any) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(404).json({ message: "Wrong Password" });
        }
        generateToken(user._id.toString(), res);
        return res.status(200).json({ message: "Login successfully" }, { data: user });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while Login" });
    }
}

export const Logout = (req:any,res:any) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout Successfully" });
    } catch (e:any) {
        console.error(e.message);
        res.status(500).json({message:"Internal server error while logout"})
    }
}

export const GetMe = async(req:any,res:any) => {
  
    try {
        const userId = req.user.id;
        if (!req.user) {
            return res.status(200).json({ data: null });
        }
        const user = await UserModel.findById({ userId }).select("-password");
        res.status(200).json({ message: "fetch user details" }, { data: user });
    } catch (e:any) {
        console.error("Error:",e.message);
        res.status(500).json({message:"Internal server error while fetching user details"})
    }
}

export const Followers = async (req: any, res: any) => {
    try {
        const user = await UserModel.find();
        res.status(200).json({ message: "fetch followers" }, { data: user });
    } catch (e:any) {
        console.error("Error",e.message);
        res.status(500).json({message:"Internal server error while fetching user"})
    }
}

export const Follow = async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(res.user.id);
      
        if (!user?.following?.includes(userId)) {
            user?.following?.push(userId)
            await user?.save();
        }

        res.status(200).json({ message: "fetch followers" }, { data: user });
    } catch (e:any) {
        console.error("Error",e.message);
        res.status(500).json({message:"Internal server error while fetching user"})
    }
}