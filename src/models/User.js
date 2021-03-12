/* eslint-disable quotes */
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "LogEntry" }],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
