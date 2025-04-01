import express from "express";
import { getMemories, postMemories } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getMemories);
router.post("/", postMemories);

export default router;
