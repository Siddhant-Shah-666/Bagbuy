const mongoose = require('mongoose');
// mongoose.connect("mpngodb:/127.0.0.1:27017/bagbuy");

const productSchema =mongoose.Schema({
    name : String,
    image :Buffer,
    price : Number,
    discount: {
        type: Number,
        default : 0
    },
    bgcolor : {
        type: String,
        default :[]
    }, 
    panelcolor :{
        type: String,
        default :[]
    },
    textcolor:{
        type: String,
        default :[]
    },
})

module.exports  = mongoose.model("product",productSchema);