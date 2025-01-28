const mongoose = require('mongoose');
// mongoose.connect("mpngodb:/127.0.0.1:27017/bagbuy");

const adminSchema =mongoose.Schema({
    fullname : {
        type:String,
        minLenght:3,
        trim: true
    },
    email : String,
    password : String,
    products : {
        type: Array,
        default :[]
    },
    pictures :String,
    gstin: String

})

module.exports  = mongoose.model("admin",adminSchema);