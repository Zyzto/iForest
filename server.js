// load environment variables
require("dotenv").config();
//dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const plantRoute = require("./routes/plants.routes");

//connect mongodb
mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log(`connected to ${process.env.DB}`),
  (err) => console.log(`MongoDB Connection Error: ${err}`)
);

// Middle Ware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes for API
app.use("/api/", require("./routes/plants.routes"));
app.use("/api/auth/", require("./routes/auth.routes"));
/// End of Routes

// 404 Routes
app.get("*", (req, res) =>
  res.json({ error: "Are you lost?", status: 404 }).status(404)
);

app.listen(process.env.PORT, () =>
  console.log(`unleashed on ${process.env.PORT}`)
);
