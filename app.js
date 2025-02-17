const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
//envoirmental varieble
let env= require("dotenv").config();
const cookieParser = require("cookie-parser");
const path =require("path");

const expressSession = require("express-session");
const flash = require("connect-flash");

const productRouter =require("./routes/productRouter");
const userRouter =require("./routes/userRouter");
const adminRouter =require("./routes/adminRouter");
const indexRouter =require("./routes/index");

//decoding and encoding of credencials
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        // secret:process.env.EXPRESS_SESSION_SECRET,  --> set its value in envoirmentel variable
        secret:"hehehe",

    })  // initializing expressSession
);
app.use(flash());

// setting up public and ejs files
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs"); 

// use app.use for redirecting to routes
app.use("/index",indexRouter);
app.use("/admin",adminRouter);
app.use("/users",userRouter);
app.use("/product",productRouter);


app.listen(3000);