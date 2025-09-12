import express from "express"
import { login,signup,logout, onboard } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/onboard",protectRoute,onboard);

router.get("/me",protectRoute,(req,res)=>{
  res.status(200).json({ success:true, user: req.user });
});

export default router;
