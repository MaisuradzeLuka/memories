import PostMemory from "../modals/postMemory.js";
import Comment from "../modals/comment.js";

export const getMemories = async (req, res) => {
  try {
    const memories = await PostMemory.find()
      .populate("author")
      .sort({ createdAt: -1 });

    res.status(200).json(memories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMemory = async (req, res) => {
  const { id } = req.params;

  try {
    const memories = await PostMemory.findOne({ _id: id }).populate("author");

    res.status(200).json(memories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postMemories = async (req, res) => {
  const postDetails = req.body;

  try {
    const newMemory = new PostMemory({ ...postDetails });

    await newMemory.save();

    res.status(201).json(newMemory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const postComment = async (req, res) => {
  const comment = req.body;

  try {
    const newComment = new Comment({ ...comment });

    await newComment.save();

    res.status(201).json(newComment);
    res.status(201).json("g");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ memory: id }).populate("author");

    res.status(200).json(comments);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
