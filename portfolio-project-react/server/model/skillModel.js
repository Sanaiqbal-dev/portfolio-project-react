const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  skill: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model("Skill", dataSchema);
