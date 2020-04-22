const router = require("express").Router();
const User = require("../models/user.model");
const Plant = require("../models/plant.model");
const multer = require('multer');
const isLoggedIn = require("../config/config");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')

//Show
router.get("/plants", (req, res) => {
  Plant.find()
    .then((plants) => {
      return res.json({ message: plants });
    })
    .catch(() => {
      console.log("plant Error", err);
      return res.json({ message: "no Items avaiable" });
    });
});

//Show
router.get("/plant/:id", (req, res) => {
  Plant.findOne({ _id: req.params.id })
    .then((plant) => {
      return res.json({ message: plant });
    })
    .catch(() => {
      console.log("plant Error", err);
      return res.json({ message: "no Item avaiable" });
    });
});

//Show my garden 
router.get('/MyGarden', isLoggedIn, (req, res) => {
  User.findById(req.user.id)
    .populate("plants")
    .then(user => {
      console.log(user);
      let plant = user.plants;
      return res.json({ plant });
    })
    .catch(err => {
      console.log(err);
    });

})

//CREATE
router.post("/plant/create", isLoggedIn, (req, res) => {
  console.log('fileD', req.file);
  console.log(req.plant);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    // return res.status(200).send(req.file)
    let plantsData = JSON.parse(req.body.plant);
    plantsData.image = req.file.filename;
    let plant = new Plant(plantsData);
    console.log(req.body);
    plant
      .save()
      .then(() => {
        User.findById(req.user.id, (err, user) => {
          user.plants.push(plant)
          user.save()
        })
        plant.user = req.user.id
        plant.save()
        return res.json({ plant });
      })
      .catch((err) => {
        console.log("err", err);
        return res.json({ message: [err.errors] });
      });
  });
});

//UPDATE
router.put("/plant/:id", (req, res) => {
  Plant.findOne(req.params.id, (err) =>
    res.json({ message: `failed to delete ${req.params.id}` })
  )
    .then((plant) => {
      //need token decode TODO
      if (plant.user == req.user) {
        plant(req.body)
          .save()
          .then(() => {
            res.json({ message: `${plant.name} Updated` });
          });
      }
    })
    .catch((err) => {
      res.json({ err });
    });
});

//DELETE
router.delete("/plant/:id", isLoggedIn, (req, res) => {
  Plant.findById(req.params.id
  )
    .then((plant) => {
      //need token decode TODO
      if (plant.user == req.user.id) {
        // Plant.findByIdAndDelete(req.params.id)
        plant.delete()
       .then(()=>{
        User.findById(req.user.id).then (()=>{

        let list = user.plants
        console.log("list",list)
        let index = list.findIndex(req.params.id)
        console.log("index", index)
        let final = list.splice(index, 1)
        console.log("final", final)
        user.plants = final
        user.save()
        .then (()=>{
          res.status(200).json({message: `${plant.name} is deleted`})
        })
        })
       }) 
      }
    })
    .catch((err) => {
      res.status(401).json({ err });
    });
});

module.exports = router;
