const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// /api/auth/
// Register Route 
router.post('/register', (req, res) => {

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    // res.send(newUser)
    User.findOne({ email: newUser.email })
        .then(user => {
            // if email not incloads the database
            if (!user) {
                bcrypt.hash(newUser.password, 10, (err, hash) => {
                    newUser.password = hash
                    User.create(newUser)
                        .then(() => res.json({ msg: "User created successfully", userInf: newUser, register: true }))
                })
            } else {
                //if email have been used 
                res.json({ msg: 'Email is used', register: false })
            }
        })
        .catch(err => res.json(err))

})

// Login Route 
router.post('/login', (req, res) => {
    const loginUser = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({ email: loginUser.email })
        .then(user => {
            //if email exist
            if (user) {
                // if password is correct 
                if (bcrypt.compareSync(loginUser.password, user.password)) {

                    user.password = undefined
                    let payload = { user: {
                        id: user._id, //we pass the id here to display in the token jwt  
                      }, };
                    let token = jwt.sign(payload, process.env.SECRET, { expiresIn: 1500 })

                    res.json({ token, login: true })
                    // if password is not correct 
                } else {
                    res.json({ msg: 'Password is not correct !!' })
                }
                //if email not exist
            } else {

                res.json({ msg: 'Email is not found !!' })
            }

        }).catch(err => res.json(err))

})



module.exports = router