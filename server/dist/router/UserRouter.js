"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controller/User");
const Auth_1 = __importDefault(require("../middleware/Auth"));
const router = express_1.default.Router();
router.post("/login", User_1.Login);
router.post("/signup", User_1.Signup);
router.post("/logout", User_1.Logout);
router.get("/me", Auth_1.default, User_1.GetMe);
router.get("/followers", Auth_1.default, User_1.Followers);
router.post("/follow/:userId", User_1.Follow);
exports.default = router;
