/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const passport = require("passport");

const uploader = require('../config/cloudinary.config');

const LogEntry = require("../models/LogEntry");

//Rota para upload de imagens 
router.post('/upload', uploader.single('picture'), (req,res) => {
  if(!req.file) {
    return res.status(500).json({msg: 'no file uploader'})
  }
  return res.status(200).json({fileUrl: req.file.path})
})


// Crud: create post
router.post("/", passport.authenticate("jwt", { session: false }),
async (req, res) => {
  try {
    const logEntry = await LogEntry.create({ ...req.body, userId: req.user._id });
    
    return res.status(201).json(logEntry);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cRud: read all posts
router.get("/", passport.authenticate("jwt", { session: false }),
async (req, res) => {
  try {
    const entries = await LogEntry.find({ userId: req.user._id });
      res.json(entries);
    // return res.status(200).json(entries);
    } catch (err) {
      next(err);
      // return res.status(500).json({ msg: err });
  }
});

// cRud: read a specific post
router.get("/post/:id", async (req, res) => {
  try {
    const logEntry = await LogEntry.findOne({ _id: req.params.id });

    return res.status(200).json(logEntry);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// crUd: update post
router.patch("/post/:id", async (req, res) => {
  try {
    const updatedPost = await LogEntry.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cruD: delete post
router.delete("/post/:id", async (req, res) => {
  try {
    const deleted = await LogEntry.deleteOne({ _id: req.params.id });

    console.log(deleted);

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
