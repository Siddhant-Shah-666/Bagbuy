const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
//envoirmental varieble
 require("dotenv").config();
const cookieParser = require("cookie-parser");
const path =require("path");

const productRouter =require("./routes/productRouter");
const userRouter =require("./routes/userRouter");
const adminRouter =require("./routes/adminRouter");
const indexRouter =require("./routes/index");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.use("/index",indexRouter);
app.use("/admin",adminRouter);
app.use("/users",userRouter);
app.use("/product",productRouter);


app.listen(3000);