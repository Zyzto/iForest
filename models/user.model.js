const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be more than 3 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Last name must be more than 3 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Your password is too weak"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    plants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],
    savePlants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
