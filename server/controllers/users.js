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
    console.error("Signin error:", error);
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
