import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedData = jwt.verify(token, "test");

    req.userId = decodedData.id;

    next();
  } catch (error) {
    res.status(402).json({ message: `Unauthorised: ${error.message}` });
  }
};
