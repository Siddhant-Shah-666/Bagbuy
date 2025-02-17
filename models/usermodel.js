const mongoose = require('mongoose');
// mongoose.connect("mpngodb:/127.0.0.1:27017/bagbuy");
const product = require("../models/productmodel")
const userSchema =mongoose.Schema({
    fullname : String,
    email : String,
    contact : Number,
    password : String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        default :[],
        ref:product
    }],
    orders : {
        type: Array,
        default :[]
    },
    pictures :String,

})

module.exports  = mongoose.model("user",userSchema);