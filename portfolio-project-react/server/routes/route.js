const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const Model = require("../model/model");
const AboutModel = require("../model/aboutModel");
const PersonalInformationModel = require("../model/personalInformationModel");

module.exports = router;

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

router.get("/getPersonalInfo", (req, res) => {
  PersonalInformationModel.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.json(data);
    // res.render("imagepage", { items: data });
  });
});
router.post(
  "/addPersonalInfo",
  upload.single("testImage"),
  (req, res, next) => {
    var obj = {
      name: req.body.name,
      designation: req.body.designation,
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    };
    PersonalInformationModel.create(obj).then((err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
);

router.post("/post", async (req, res) => {
  const data = new Model({
    companyName: req.body.companyName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDate = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedDate, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataToDelete = await Model.findByIdAndDelete(id);
    res.status(200).json("Item deleted");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAboutContent", async (req, res) => {
  try {
    const aboutData = await AboutModel.find();
    res.json(aboutData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/updateAboutContent/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDate = req.body;
    const options = { new: true };
    console.log("In Server: ", req.body);
    const result = await AboutModel.findByIdAndUpdate(id, updatedDate, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/////////////////////////////////////////////////////

router.post("/postPersonalInformation", async (req, res) => {
  const data = new PersonalInformationModel({
    name: req.body.name,
    designation: req.body.designation,
    image: req.body.image,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
