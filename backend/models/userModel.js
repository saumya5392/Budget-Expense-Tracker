const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lname: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

//export
//modelname- users and refrence add krege jo ki h userSchema
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
 