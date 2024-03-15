const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// register a user
const registerUser = async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber, role } = req.body;
  
    try {
      const user = await User.register(email, password, firstName, lastName, phoneNumber, role);
  
      // create a token
      const token = createToken(user._id);
  
      res.status(201).json({ message:"Register successful", email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
  
      // create a token
      const token = createToken(user._id);
  
      res.status(200).json({ message:"Login successful", email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {registerUser, loginUser};