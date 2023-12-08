var mongoose = require("mongoose");
var personalInformationSchema = new mongoose.Schema({
  name: String,
  designation: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("PersonalInformation", personalInformationSchema);
