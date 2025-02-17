const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminmodel");


// console.log(process.env.NODE_ENV);


//this route will only work in development phase (process.env.NODE_ENV == development)
if(process.env.NODE_ENV ==="development"){
    router.post("/create",async(req,res)=>{
        let admin =  await adminModel.find();
        if (admin.length > 0){
            return res.status(503).send("no more admin");
        }


        //fetching data from form(frontend)
        let {fullname, email, password} = req.body;

        //storing data in database
       let createdAdmin = await adminModel.create({
            fullname,
            email,
            password
        })

        res.send(createdAdmin)
    })
}


router.get("/admin",(req,res)=>{
   let success= req.flash("success");
    res.render("createproducts",{success});
});


module.exports = router;