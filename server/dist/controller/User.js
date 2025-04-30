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
exports.Login = exports.Signup = void 0;
const generateToken_1 = require("../lib/generateToken");
const UserSchema_1 = __importDefault(require("../model/UserSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield UserSchema_1.default.create({
            username,
            email,
            password: hashedPassword
        });
        (0, generateToken_1.generateToken)(user._id.toString(), res);
        return res.status(200).json({ message: "User account created successfully" }, { data: user });
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
        const user = yield UserSchema_1.default.findOne(email);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const isPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPassword) {
            return res.status(404).json({ message: "Wrong Password" });
        }
        (0, generateToken_1.generateToken)(user._id.toString(), res);
        return res.status(200).json({ message: "User account created successfully" }, { data: user });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while Login" });
    }
});
exports.Login = Login;
