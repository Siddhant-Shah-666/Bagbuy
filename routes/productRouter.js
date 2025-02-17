const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const productModel = require("../models/productmodel");

const upload = require("../config/multer-config");

router.post("/create", upload.single("image"), async (req, res) => {
  // res.send(req.file);
 try{
  let { image,name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  let product = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });
  req.flash("success", "Product created Successfully..!!")
  res.redirect("/admin/admin")
}catch(err){
    res.send(err.message);
    
}
});

module.exports = router;
