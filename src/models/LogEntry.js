/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const logEntrySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    startDate: {
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
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }
  },
  {
    timestamps: true,
  }
);

const LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
