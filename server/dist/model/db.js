"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectDb = () => {
    const MongoUrl = process.env.MONGO_URL || "";
    console.log(MongoUrl, "mongodb");
    try {
        mongoose_1.default
            .connect(MongoUrl)
            .then(() => {
            console.log("connected to mongodb");
        })
            .catch(() => {
            console.log("disconnected to mongoDb");
        });
    }
    catch (e) {
        console.error(e.message);
    }
};
exports.default = ConnectDb;
