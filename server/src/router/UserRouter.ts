import express from "express"
import { GetMe, Login, Logout, Signup } from "../controller/User";
import { Authenticate } from "../middleware/Auth";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.get("/me", GetMe);

export default router;