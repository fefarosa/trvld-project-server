/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    latitude: {
      type: Number,
      min: -90,
      max: 90,
      required: true,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
