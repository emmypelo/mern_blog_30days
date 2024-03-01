import express from "express";
import { json } from "express";
import dotenv from "dotenv";

import mongoose from "mongoose"; // Import mongoose

dotenv.config();

// create Express instance in app
const app = express();

const port = process.env.PORT;

app.use(json());

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
