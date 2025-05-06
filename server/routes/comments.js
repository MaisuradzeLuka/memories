import express from "express";
import { postComment, getComments } from "../controllers/comments.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, postComment);
router.get("/:id", getComments);

export default router;
