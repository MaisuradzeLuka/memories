import express from "express";
import {
  getMemories,
  getMemory,
  postMemories,
  postComment,
  getComments,
} from "../controllers/posts.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMemories);
router.get("/:id", getMemory);
router.post("/", auth, postMemories);
router.post("/comments", auth, postComment);
router.get("/comments/:id", getComments);

export default router;
