const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
//signup
exports.signUp = async (req, res) => {
  try {
    //data fetch from req body
    const {
      firstname,
      lastname,
      email,
      password,
      phonenumber,
    } = req.body.data;

    //validate karlo

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password 
    ) {
      return res.status(403).json({
        success: false,
        message: "all fields are required",
      });
    }

    //check user already exist or not

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //entry create in db

    const userData = await User.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword,
        contact:phonenumber
    });

    //return response
    return res.status(200).json({
      success: true,
      message: "user is registered Successfully",
      userData,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: console.log("Error while registering user: ", error.message),
    });
  }
};

exports.login = async (req, res) => {
  try {
    //fetch email and password
    const { email, password } = req.body;

    //validation data

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill the details carefully",
      });
    }
    //user check does exist or not

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: true,
        message: "user does not exist Please registered first",
      });
    }

    //generate jwt token and match password
    console.log("user", user);
    console.log("password is this: ", password);
    console.log("hashed password is this: ", user.password);

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;

      //create cookie

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password Please fill correct password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: console.log("Error while login", error),
    });
  }
};
