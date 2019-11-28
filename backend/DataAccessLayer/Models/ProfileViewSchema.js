"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileViewSchema = new Schema({
  userID: { type: String, required: true, index: true },
  viewDate: Date,
  viewCount: { type: Number, min: 0 }
});

const profileview = mongoose.model("tweets", ProfileViewSchema, "tweets");
module.exports = { profileview, ProfileViewSchema };
