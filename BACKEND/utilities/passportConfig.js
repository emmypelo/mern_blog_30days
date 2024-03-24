import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import User from "../models/User/User.js";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import GoogleStrategy from "passport-google-oauth20";

export const localStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }

          const match = await bcrypt.compare(password, user.password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid email or password" });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies["writeIt"];
      }
      return token;
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = () => {
  passport.use(
    new JWTStrategy(options, async (userDecoded, done) => {
      try {
        const user = await User.findOne({ id: userDecoded.sub });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export const googleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:4000/api/users/google/callback",
      },
      async (accessToken, refreshtoken, profile, done) => {
        try {
          //check if user found
          let user = await User.findOne({
            googleId: profile.id,
          });
          //destructure properties from the profile
          const {
            id,
            displayName,
            name,
            _json: { picture },
          } = profile;
          //check if email exists
          let email = "";
          if (Array.isArray(profile?.emails) && profile?.emails?.length > 0) {
            email = profile.emails[0].value;
          }
          //check if user not found
          if (!user) {
            user = await User.create({
              username: displayName,
              googleId: id,
              profilePicture: picture,
              authMethod: "google",
              email,
            });
          }
          done(null, user);
        } catch (error) {
          done, error, null;
        }
      }
    )
  );
};
