const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Blog Name"],
  },

  author: {
    type: String,
    required: [true, "Please Enter Blog Author"],
  },

  content: {
    type: String,
    required: [true, "Please Enter Blog Description"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
