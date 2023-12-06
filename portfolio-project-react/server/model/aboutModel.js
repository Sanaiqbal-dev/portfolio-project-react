const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  about: {
    required: true,
    type: String,
  },
  contact: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("About", dataSchema);
