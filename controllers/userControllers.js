const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// register a user
const registerUser = async (req, res) => {
    const { username, email, hashedPassword } = req.body;
  
    try {
      const user = await User.register(username, email, hashedPassword);
  
      // create a token
      const token = createToken(user._id);
  
      res.status(200).json({ message:"Sign up successful", username, email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {registerUser};