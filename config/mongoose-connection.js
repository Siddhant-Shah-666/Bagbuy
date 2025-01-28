const mongoose = require('mongoose');

//installed debug package     ("chacha:cchacha")
const dbgr = require("debug") ("development:Mongoose");
// setting envoirmertel varieble in terminer
//syntex = set DEBUG=development:* 

const config = require("config");
//$env:NODE_ENV="development" --> setting the envoirment to development

// mongoose.connect("mongodb://127.0.0.1:27017/bagbuy")
mongoose
.connect(`${config.get("MONGODB_URI")}/bagbuy`)
.then(function(){
    dbgr("db connected");
    
}).catch(function(err){
     dbgr(err);
    
})
module.exports =mongoose.connection;