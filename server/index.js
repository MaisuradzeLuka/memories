import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import MemoryRouter from "./routes/posts.js";

const app = express();

app.use("/posts", MemoryRouter);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Luka:J0tkO1OqnVAlHMlr@cluster0.gjygato.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() =>
    app.listen(5000, () => console.log(`Server running on port:${5000}`))
  )
  .catch((error) => console.log(`Something went wrong: ${error}`));
