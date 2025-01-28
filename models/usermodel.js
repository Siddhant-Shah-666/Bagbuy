const mongoose = require('mongoose');
mongoose.connect("mpngodb:/127.0.0.1:27017/bagbuy");

const userSchema =mongoose.Schema({
    fullname : String,
    email : String,
    contact : Number,
    password : String,
    cart: {
        type: Array,
        default :[]
    },
    orders : {
        type: Array,
        default :[]
    },
    pictures :String,
    isadmin : Boolean

})

module.exports  = mongoose.model("user",userSchema);