import express from "express"
import { Follow, Followers, GetMe, Login, Logout, Signup } from "../controller/User";
import { Authenticate } from "../middleware/Auth";


const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.get("/me", Authenticate, GetMe);

router.get("/followers",Authenticate,Followers)
router.post("/follow/:userId", Follow);
export default router;