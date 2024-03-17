import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User/User.js";

const localStrategy = () => {
  passport.use(
    new Strategy(
      {
        usernameField: "email", // Corrected field name to 'usernameField' instead of 'emailField'
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "Invalid user credentials" }); // Corrected error message
          }

          const match = await bcrypt.compare(password, user.password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid login credentials" });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default localStrategy;
