const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const waterSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  amountInLiters: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  user_id: { 
    type: String, 
    required: true
  },
});

module.exports = mongoose.model("Water", waterSchema);
