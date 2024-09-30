const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  f_Image: {
    type: String,
    required: true,
  },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
  },
  f_Mobile: {
    type: String,
    required: true,
  },
  f_Designation: {
    type: String,
    required: true,
  },
  f_gender: {
    type: String,
    required: true,
  },
  f_Course: {
    type: String,
    required: true,
  },
  f_Createdate: {
    type: Date,
    default: Date.now,
  },
  f_sno: {
    type: String,
    required: true,
  },

  f_Pwd: {
    type: String,
    required: true,
  },
  f_isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
