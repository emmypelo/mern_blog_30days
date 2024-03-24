import dotenv from "dotenv";
dotenv.config();

import User from "../../models/User/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

import jwt from "jsonwebtoken";
import passport from "passport";

const userController = {
  checkUserExist: asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      let userExist = await User.findOne({ email });
      if (userExist) {
        const user = email;
        res.status(200).json({ userExists: true });
        console.log(user, "", "exists");
        return user;
      } else {
        res.status(200).json({ userExist: false });
        console.log(email, "", "does not exist");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  }),

  checkUsernameExist: asyncHandler(async (req, res) => {
    const { username } = req.body;
    try {
      let userExist = await User.findOne({ username });
      if (userExist) {
        const user = username;
        res.status(200).json({ userExists: true });
        console.log(user, "", "exists");
        return user;
      } else {
        res.status(200).json({ userExist: false });
        console.log(username, "", "does not exist");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  }),

  createUser: asyncHandler(async (req, res) => {
    const { name, username, email, password, passMatch } = req.body;

    // Check if passwords match
    if (password !== passMatch) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    try {
      // Check if user exists
      let userExist = await User.findOne({ username, email });
      if (userExist) {
        return res.status(400).json({ error: `User already exists` });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await User.create({
        name,
        username: req?.body?.username,
        email,
        password: hashedPassword,
      });

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
      res.cookie("writeIt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
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
  }), // ! googleAuth-->
  googleAuth: passport.authenticate("google", { scope: ["profile"] }),
  // ! GoogleAuthCallback
  googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
        session: false,
      },
      (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          return res.redirect("http://localhost:5173");
        }
        //generate the token

        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });
        //set the token into the cooke
        res.cookie("writeIt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, //1 day:
        });
        //redirect the user dashboard
        res.redirect("http://localhost:5173");
      }
    )(req, res, next);
  }),
  // Authentication status check
  checkAuthentication: asyncHandler(async (req, res) => {
    const token = req.cookies["writeIt"];
    if (!token) return res.status(401).json({ isAuthenticated: false });
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

      // finding user
      const user = await User.findById(decodedUser.id);

      if (!user) {
        return res.status(401).json({ isAuthenticated: false });
      } else {
        return res.status(201).json({
          isAuthenticated: true,
          _id: user?._id,
          username: user?.username,
          profilePicture: user.profilePicture,
        });
      }
    } catch (error) {
      return res.status(401).json({ isAuthenticated: false,
         error });
    }
  }),
};

export default userController;
