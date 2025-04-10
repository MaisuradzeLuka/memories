import express from "express";
import {
  getUser,
  singinUser,
  singupUser,
  updateUser,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUser);
router.post("/signin", singinUser);
router.post("/signup", singupUser);
router.patch("/onboarding", auth, updateUser);

export default router;
