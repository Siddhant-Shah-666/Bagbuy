const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("hello");
});


module.exports = router;