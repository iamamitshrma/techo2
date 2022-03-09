const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');


router.post("/register", async(req, res) => {
    console.log("req.body");

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        phone: req.body.phone,
        password: req.body.password,
        key: Math.trunc(Math.random() * 100000000000000)
    });
    try {
        const user = await newUser.save();
        res.status(200).json(user);        
    } catch (error) {
        res.status(500).json(error);        
    }
});

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong password or username");   

        res.status(200).json({user});  


    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;