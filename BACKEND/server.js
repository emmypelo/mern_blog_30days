import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from "./routes/posts/postRouter.js";
import userRouter from "./routes/user/userRouter.js";
import passport from "passport";
import localStrategy from "./utilities/passportConfig.js";

dotenv.config();

// create Express instance in app
const app = express();

const port = process.env.PORT;

app.use(express.json());
// cors configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://10.0.110.139:4000"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(passport.initialize());
localStrategy();

// Routes
app.use("/api", postRouter);
app.use("/api", userRouter);

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
