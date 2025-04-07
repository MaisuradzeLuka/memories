import express from "express";
import { singinUser, singupUser } from "../controllers/users.js";

const router = express.Router();

router.post("/signin", singinUser);
router.post("/signup", singupUser);

export default router;
