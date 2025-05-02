import express from "express"
import { Login, Signup } from "../controller/User";
import  Authenticate  from "../middleware/Auth";
import { message } from "../controller/Message";

const router = express.Router();

router.get("/chat/:userId",Authenticate, message);

export default router;