import PostMemory from "../modals/postMemory.js";

export const getMemories = async (req, res) => {
  try {
    const memories = await PostMemory.find().sort({ createdAt: -1 });

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
