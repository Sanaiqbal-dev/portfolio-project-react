const express = require("express");

const router = express.Router();
const Model = require("../model/model");
const AboutModel = require("../model/aboutModel");

module.exports = router;

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