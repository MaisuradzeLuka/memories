import User from "../modals/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const singinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Couldn't sign in user: ${error.message}` });
  }
};

export const singupUser = async (req, res) => {
  try {
    const { email, name, lastname, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name,
      lastname,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    throw new Error(`Coudln't sign up user: ${error.message}`);
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      { ...user },
      { new: true }
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Couelnt update user" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) res.status(403).json({ message: "Unauthorized" });

    const user = await User.findOne({ _id: userId });

    res.status(200).json({
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      userId: user._id,
      bio: user.bio,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(400).json({ message: "Couldn't find the user" });
  }
};
