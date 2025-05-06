import Comment from "../modals/comment.js";

export const postComment = async (req, res) => {
  const comment = req.body;

  try {
    const newComment = new Comment({ ...comment });

    await newComment.save();

    res.status(201).json(newComment);
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
