dotenv.config();
import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from "./routes/posts/postRouter.js";
import bodyParser from "body-parser";

// create Express instance in app
const app = express();

app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Routes
app.use("/api", postRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not fouund on the server" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const message = err.message;
  const stack = err.stack;
  res.status(500).json({ message, stack });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Connected to MongoDB & listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
