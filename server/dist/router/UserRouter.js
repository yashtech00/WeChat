"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controller/User");
const router = express_1.default.Router();
router.post("/login", User_1.Login);
router.post("/signup", User_1.Signup);
exports.default = router;
