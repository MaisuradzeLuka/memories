import PostMemory from "../modals/postMemory.js";

export const getMemories = async (req, res) => {
  try {
    const memories = await PostMemory.find();

    res.status(200).json(memories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postMemories = async (req, res) => {
  try {
  } catch (error) {}
};
