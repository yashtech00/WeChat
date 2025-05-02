import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useAuth } from "../hooks";
import { LockKeyhole, Mail, User, UserRoundPen } from "lucide-react";

export const Auth = ({ type }: { type: "signup" | "login" }) => {
    const { setAuthUser } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const navigate = useNavigate();
    const Backend_Url = import.meta.env.VITE_APP_BACKEND_URL;

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                `${Backend_Url}/user/${type}`,
                {
                    fullname,
                    username,
                    email,
                    password,
                },
                { withCredentials: true }
            );

            const user = res.data.data;
            setAuthUser(user);


            setUsername("");
            setEmail("");
            setPassword("");
            setFullname("");
            console.log(res, "login info");
            navigate("/chat");
            toast.success(`${type} successfully`)
        } catch (e: any) {
            console.error(e.message);
            toast.error(`Error getting ${type}`)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen text-white">
            <div className="absolute top-4 left-4 font-bold text-4xl text-orange-700">WeChat</div>
            <div className="  p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold  mb-6">
                    {type === "signup" ? "Sign up" : "Sign in"}
                </h1>
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    {type === "signup" && (
                        <>

                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <div className="relative">
                                    <User
                                        className="absolute top-2 left-2 z-10 w-5 h-5 text-gray-500" // Position and size the icon
                                    />
                                <input
                                    className="block w-full py-2 pl-8 pr-3 bg-gray-900 text-white rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    placeholder="Enter Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    type="text"
                                    />
                                    </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Fullname</label>
                                <div className="relative">
                                    <UserRoundPen
                                        className="absolute top-2 left-2 z-10 w-5 h-5 text-gray-500" // Position and size the icon
                                    />
                                    <input
                                        className="block w-full py-2 pl-8 pr-3 bg-gray-900 text-white rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                        placeholder="Enter Fullname"
                                        onChange={(e) => setFullname(e.target.value)}
                                        value={fullname}
                                        type="text"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <div className="relative">
                                    <Mail
                                        className="absolute top-2 left-2 z-10 w-5 h-5 text-gray-500" // Position and size the icon
                                    />
                        <input
                            className="block w-full py-2 pl-8 pr-3 bg-gray-900 text-white rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            />
                            </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                                    <LockKeyhole
                                        className="absolute top-2 left-2 z-10 w-5 h-5 text-gray-500" // Position and size the icon
                                    />
                        <input
                            className="block w-full py-2 pl-8 pr-3 bg-gray-900 text-white rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="Enter Password "
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            />
                            </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-orange-600 hover:bg-orange-700 rounded-md text-white font-semibold transition duration-200"
                    >
                        {type === "signup" ? "Sign Up" : "Log In"}
                    </button>

                    <div className="flex justify-center">
                        <span>
                            {type === "signup"
                                ? "Already have an account,"
                                : "Don't have an account,"}
                        </span>
                        <Link to={type === "signup" ? "/login" : "/signup"}>
                            <span className="underline mx-1">
                                {type === "signup" ? "Login" : "Signup"}
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};