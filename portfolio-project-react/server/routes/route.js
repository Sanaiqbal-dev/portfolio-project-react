const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const Model = require("../model/model");
const AboutModel = require("../model/aboutModel");
const SkillModel = require("../model/skillModel");
const PersonalInformationModel = require("../model/personalInformationModel");
const skillModel = require("../model/skillModel");

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
  PersonalInformationModel.find({}).then((data, error) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.json(data);
    }
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
    PersonalInformationModel.create(obj).then((error, savedData) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else {
        res.send("Image is saved", savedData);
      }
    });
  }
);

router.patch(
  "/updatePersonalInfo/:userId",
  upload.single("testImage"),
  (req, res, next) => {
    const userId = req.params.userId;
    const updatedFields = {
      name: req.body.name,
      designation: req.body.designation,
    };

    if (req.file) {
      updatedFields.image = {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      };
    }
    const options = { new: true };

    PersonalInformationModel.findByIdAndUpdate(userId, updatedFields, options)
      .then((updatedItem) => {
        if (!updatedItem) {
          return res.status(404).json("User not found");
        } else {
          res.status(200).json({
            message: "Personal information updated",
            data: updatedItem,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
);

router.post("/post", async (req, res) => {
  const workExperiencedata = new Model({
    companyName: req.body.companyName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
  });
  try {
    const NewData = await workExperiencedata.save();
    res.status(200).json(NewData);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataToDelete = await Model.findByIdAndDelete(id);
    res.status(200).json("Item deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const result = await AboutModel.findByIdAndUpdate(id, updatedDate, options);
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/getSkillsList", async (req, res) => {
  try {
    const skillData = await SkillModel.find();
    res.json(skillData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/AddSkillItem", async (req, res) => {
  const data = new SkillModel({
    skill: req.body.skill,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json({ message: "Data Added", data:dataToSave});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deleteSkillItem/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataToDelete = await skillModel.findByIdAndDelete(id);
    res.status(200).json("data deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/updateSkillItem/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {
      skill: req.body.skill,
    };
    const options = { new: true };

    const result = await skillModel.findByIdAndUpdate(
      id,
      updatedFields,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
