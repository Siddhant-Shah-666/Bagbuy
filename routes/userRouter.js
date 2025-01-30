const express = require("express");
const router = express.Router();
const db = require("../config/mongoose-connection");
const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const {generateToken} = require("../utils/generateToken")
router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/register", (req, res) => {
    try {
        //check out joy package if you want to not miss out any field..
        let { fullname, email, password } = req.body;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.send(err.message);
                }
                else {

                    let user = await usermodel.create({
                        fullname,
                        email,
                        password : hash
                    })
                    // moving this token to utils folder in genetatetoken
                    let token =jwt.sign({email,id:user._id},"myDarling", {expiresIn: '1h'});
                    // let token = generateToken(user); // 
                    res.cookie("token",token);
                    res.send("user created successfully..!");
                }
            })
        })

    }
    catch (err) {
        console.log(err.message);

    }


});


module.exports = router;