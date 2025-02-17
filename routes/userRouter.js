const express = require("express");
const router = express.Router();
// const db = require("../config/mongoose-connection");

const {registerUser, loginUser,logout} = require("../controllers/authcontroller")


router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/register", registerUser );//registeration code is in controlletr folder in authcontroller file

router.post("/login", loginUser );//login code is in controlletr folder in authcontroller file

router.post("/logout", logout );//logout code is in controlletr folder in authcontroller file


module.exports = router;