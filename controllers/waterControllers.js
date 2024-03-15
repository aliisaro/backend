const mongoose = require("mongoose");
const fs = require("fs");
const Resource = require("../models/waterModel");

//Add resource
const addResource = async (req, res) => {
  const { date, amountInLiters, comments, user_id } = req.body;

  try {
    const user_id = req.user._id;

    const newResource = new Resource({
      date,
      amountInLiters,
      comments,
      user_id,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get all resources
const getAllResources = async (req, res) => {
  const user_id = req.user._id;

  try {
    const Resources = await Resource.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(Resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//get by id

const getResourceById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No water intake found" });
  }

  try {
    const user_id = req.user._id;
    const resource = await Resource.findById(id)
      .where("user_id")
      .equals(user_id);
    if (!resource) {
      return res.status(404).json({ message: "water intake not found" });
    }
    res.status(200).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//delete by id

const deleteResource = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const resource = await Resource.findByIdAndDelete({
      _id: id,
      user_id: user_id,
    });
    if (!resource) {
      return res.status(404).json({ message: "Water not found" });
    }
    res.status(200).json({ message: "Water deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//Update Resource
const updateResource = async (req, res) => {
  const id = req.params.id;
  try {
    const user_id = req.user._id;
    const resource = await Resource.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllResources,
  addResource,
  getResourceById,
  deleteResource,
  updateResource,
};
