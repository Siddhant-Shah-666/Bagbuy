const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");


// setting up register and login page
router.get("/",(req,res)=>{
    const error =req.flash("error"); 
    res.render("index", { error , loggedin :false });
});//go to userRouter.js for the next step(registeration and login)

router.get("/shop",isloggedin,async(req,res)=>{
let success = req.flash("success");
   let products = await productmodel.find();
   res.render("shop",{products, success})
});



router.get("/cart",isloggedin,async(req,res)=>{

    let user = await usermodel.findOne({email:req.user.email}).populate("cart");
    let bill = Number(user.cart[0].price) + 20 -Number(user.cart[0].discount);
   res.render("cart",{user,bill})
});


router.get("/addtocart/:productid",isloggedin,async(req,res)=>{
    let user = await usermodel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash('success',"Added to cart..!!");
    res.redirect("/index/shop");
    // res.send("hhhh")
})

router.get("/logout",isloggedin,(req,res)=>{
    res.render("logout")
})




module.exports = router;