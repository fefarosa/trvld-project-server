/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable quotes */
const { Router } = require("express");

const LogEntry = require("../models/LogEntry");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (err) {
    console.log(err.constructor.name);
    if (err.name === "ValidationError") {
      res.status(422);
    }
    next(err);
  }
});

module.exports = router;
