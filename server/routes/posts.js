import express from "express";
import { getMemories, getMemory, postMemories } from "../controllers/posts.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMemories);
router.get("/:id", getMemory);
router.post("/", auth, postMemories);

export default router;
