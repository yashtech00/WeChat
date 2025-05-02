"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../middleware/Auth"));
const Message_1 = require("../controller/Message");
const router = express_1.default.Router();
router.get("/chat/:userId", Auth_1.default, Message_1.message);
exports.default = router;
