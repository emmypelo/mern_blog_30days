import User from "../../models/User/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

import jwt from "jsonwebtoken";
import passport from "passport";

const userController = {
  createUser: asyncHandler(async (req, res) => {
    const { name, username, email, password, passMatch } = req.body;

    // Check if passwords match
    if (password !== passMatch) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    try {
      // Check if user exists
      let userExist = await User.findOne({username, email});
      if (userExist) {
        return res.status(400).json({ error: `User already exists` });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });

      // Save user to database
      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Server Error" });
    }
  }),

  loginUser: asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      //check if user not found
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      //generate token
      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
      //set the token into cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      });

      //send the response
      res.json({
        status: "success",
        message: "Login Success",
        userName: user?.username,
        email: user?.email,
        _id: user?._id,
      });
    })(req, res, next);
  }),
};

export default userController;
