const express = require('express');
const router = express.Router();
const Users = require('../models/Users');



//Create user


//Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }
})


//Get a user by username
router.get('/users/:username', async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.params.username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;

