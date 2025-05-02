"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = exports.Followers = exports.GetMe = exports.Logout = exports.Login = exports.Signup = void 0;
const generateToken_1 = require("../lib/generateToken");
const UserSchema_1 = __importDefault(require("../model/UserSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, username, email, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield UserSchema_1.default.create({
            fullname,
            username,
            email,
            password: hashedPassword
        });
        (0, generateToken_1.generateToken)(user._id, res);
        return res.status(200).json({
            message: "User account created successfully",
            data: user
        });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while signup" });
    }
});
exports.Signup = Signup;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserSchema_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const isPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPassword) {
            return res.status(404).json({ message: "Wrong Password" });
        }
        (0, generateToken_1.generateToken)(user._id, res);
        return res.status(200).json({ message: "Login successfully" }, { data: user });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while Login" });
    }
});
exports.Login = Login;
const Logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout Successfully" });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal server error while logout" });
    }
};
exports.Logout = Logout;
const GetMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        if (!req.user) {
            return res.status(200).json({ data: null });
        }
        console.log(userId, "get me user id");
        const user = yield UserSchema_1.default.findById(userId).select("-password");
        res.status(200).json({ message: "fetch user details" }, { data: user });
    }
    catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({ message: "Internal server error while fetching user details" });
    }
});
exports.GetMe = GetMe;
const Followers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema_1.default.find();
        res.status(200).json({ message: "fetch followers" }, { data: user });
    }
    catch (e) {
        console.error("Error", e.message);
        res.status(500).json({ message: "Internal server error while fetching user" });
    }
});
exports.Followers = Followers;
const Follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userId } = req.params;
        const user = yield UserSchema_1.default.findById(res.user.id);
        if (!((_a = user === null || user === void 0 ? void 0 : user.following) === null || _a === void 0 ? void 0 : _a.includes(userId))) {
            (_b = user === null || user === void 0 ? void 0 : user.following) === null || _b === void 0 ? void 0 : _b.push(userId);
            yield (user === null || user === void 0 ? void 0 : user.save());
        }
        res.status(200).json({ message: "fetch followers" }, { data: user });
    }
    catch (e) {
        console.error("Error", e.message);
        res.status(500).json({ message: "Internal server error while fetching user" });
    }
});
exports.Follow = Follow;
