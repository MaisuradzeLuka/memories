import express from "express";
import {
  getMemories,
  getMemory,
  postMemories,
  postComment,
} from "../controllers/posts.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMemories);
router.get("/:id", getMemory);
router.post("/", auth, postMemories);
router.post("/comments", auth, postComment);

export default router;
