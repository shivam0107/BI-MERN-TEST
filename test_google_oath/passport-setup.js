const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      session: false,
    },
    async (accessToken, refreshToken, profile, done) => {
      // This function will be called when the user is authenticated
      // You can perform database operations here to save user data

      // Generate JWT token
      console.log(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );

      console.log("profile", profile);
      const token = jwt.sign({ profile }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const data = {
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
      };

      const user = await User.findOne({ email: data.email });
      if (!user) {
        User.create({
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          token:token
        });
      }

      return done(null, token);
    }
  )
);
