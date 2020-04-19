const mongoose = require("mongoose");

const plantSchema = mongoose.Schema({
  name: String,
  image: String,
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
  },
  description: String,
  rating: Number,
  comments: [],
});

let Plant = mongoose.model("Plant", plantschema);

module.exports = Plant;
