const mongoose = require("mongoose");

const plantSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: {
    enum: [
      "Flower",
      "Liverworts",
      "Hornworts",
      "Mosses",
      "Ferns",
      "Conifers",
      "Cycads",
    ],
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  sunTime: {
    enum: [
      "Full Sun",
      "Light Shade",
      "Partial Shade",
      "Full Shade",
      "Dense Shade",
    ],
    type: String,
    required: true,
  },
  waterPlan: { type: [], required: true },
  rating: { type: [], default: [] },
  comments: { type: [], default: [] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

let Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
