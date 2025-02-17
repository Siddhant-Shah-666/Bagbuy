const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

console.log("hhhhh")
module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "you need to login firtst");
        return res.redirect("/index");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);//retriving user data fro token
        let user = await usermodel.findOne({ email: decoded.email })
            .select("-password");//retrive data except passsword

        req.user = user;
        console.log(user);

        next();

    }catch (err) {
        req.flash("error", "something went wrong");
        res.redirect("/index");
    }
};
