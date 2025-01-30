const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    const error = "Sample error message"; 
    res.render("index", { error });
});


module.exports = router;