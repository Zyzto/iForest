const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../config/config");

// /api/auth/
// Register Route
router.post("/register", (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  // res.send(newUser)
  User.findOne({ email: newUser.email })
    .then((user) => {
      // if email not incloads the database
      if (!user) {
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          newUser.password = hash;
          User.create(newUser).then(() =>
            res.json({
              message: "User created successfully",
              userInf: newUser,
              register: true,
            })
          );
        });
      } else {
        //if email have been used
        res.json({ message: "Email is used", register: false });
      }
    })
    .catch((err) => res.json(err));
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //   const loginUser = {
  //     email: req.body.email,
  //     password: req.body.password,
  //   };
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.json({ message: "Email is not found !!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Password is not correct !!" });
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token }).status(200);
      }
    );

    // res.json({ message: "You are loggedin!" }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: "You are not Logged in!", error }).status(400);
  }
  // .then((user) => {
  //   //if email exist
  //   if (user) {
  //     // if password is correct
  //     if (bcrypt.compareSync(loginUser.password, user.password)) {
  //       // user.password = undefined
  //       let payload = {
  //         user: {
  //           id: user._id, //we pass the id here to display in the token jwt
  //         },
  //       };
  //       console.log("payload", payload);
  //       let token = jwt.sign(payload, process.env.SECRET, {
  //         expiresIn: 1500,
  //       });
  //       console.log(token);

  //       res.json({ token, login: true });
  //       // if password is not correct
  //     } else {
  //       res.json({ message: "Password is not correct !!" });
  //     }
  //     //if email not exist
  //   } else {
  //     res.json({ message: "Email is not found !!" });
  //   }
  // })
  // .catch((err) => res.json(err));
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password").populate(
      "plants"
    );
    if (!user) return res.json({ message: "No User Found!" });
    return res.status(200).json({ user });
  } catch (error) {
    res.json({ message: "Can't Get Information", error });
  }
});

// update user info route
router.put("/update", isLoggedIn, async (req, res) => {
  console.log("REQUSER", req.user);
  console.log("REQBODY", req.body);
  let inputUser = { ...req.body };
  try {
    if (req.body.password)
      inputUser.password = await bcrypt.hash(req.body.password, 10);
    let user = await User.findByIdAndUpdate(req.user.id, inputUser);
    if (!user) throw error;

    res.status(200).json({ message: "User Updated!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong!" });
  }
});

router.put("/update/savedPlants", isLoggedIn, async (req, res) => {
  console.log("REQUSER", req.user);
  console.log("REQBODY", req.body);
  let inputUser = { ...req.body };
  let oldUser = await User.findById(req.user);
  let check = oldUser.savedPlants.some(inputUser);
  if (check) {
    try {
      let final = oldUser.savedPlants.filter(inputUser);
      let user = await User.findByIdAndUpdate(
        { savedPlants: [...final] },
        inputUser
      );
      if (!user) throw error;
      res.status(200).json({ message: "plant added to fav" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "something went wrong!" });
    }
  } else {
    try {
      let final = oldUser.savedPlants.push(inputUser);
      let user = await User.findByIdAndUpdate(
        { savedPlants: [...final] },
        inputUser
      );
      if (!user) throw error;
      res.status(200).json({ message: "User Updated!" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "something went wrong!" });
    }
  }
});

module.exports = router;
