// load environment variables
require("dotenv").config();
//dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')

//connect mongodb
mongoose.connect(
  process.env.DB,
  () => console.log(`connected to ${process.env.DB}`),
  (err) => console.log(`MongoDB Connection Error: ${err}`)
);

// Middle Ware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:false}))

// Routes for API
/// End of Routes
app.use("/api/auth/", require("./routes/auth.routes"));

// 404 Routes
app.get("*", (req, res) =>
  res.json({ error: "Are you lost?", status: 404 }).status(404)
);

app.listen(process.env.PORT, () =>
  console.log(`unleashed on ${process.env.PORT}`)
);
