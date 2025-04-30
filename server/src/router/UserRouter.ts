import express from "express"
import { Login, Signup } from "../controller/User";
import { Authenticate } from "../middleware/Auth";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);

router.get("/chat",Authenticate, message);

export default router;