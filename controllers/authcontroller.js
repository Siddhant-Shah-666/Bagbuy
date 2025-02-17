const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utils/generateToken")


module.exports.registerUser = async(req, res) => {
    try {
        //check out joy package if you want to not miss out any field..
        let { fullname, email, password } = req.body;

        let checkuser = await usermodel.findOne({ email: email });
        if (checkuser) {
            // return res.status(401).send("already have a account");
            req.flash('error',"Email already exist, please login..!!");
            res.redirect("/index");
        }
        else {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        req.flash('error',"Something went wrong ..!!");
                        return res.send(err.message);
                    }
                    else {

                        let user = await usermodel.create({
                            fullname,
                            email,
                            password: hash
                        })
                        // moving this token to utils folder in genetatetoken
                        // let token =jwt.sign({email,id:user._id},"myDarling", {expiresIn: '1h'});
                        let token = generateToken(user); // 
                        res.cookie("token", token);
                        res.redirect("/index");
                        // res.send(token);
                    }
                })
            })
        }

    }
    catch (err) {
        console.log(err.message);

    }


}

module.exports.loginUser = async(req,res)=>{
    try {
        let {email,password} =req.body;
        let user = await  usermodel.findOne({email:email});
        if(!user){
            req.flash('error',"Email not found,,Please Register first..!!");
            return res.status(401).send("user not found");
        }
        else{
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    req.flash('error',"Something went wrong..!!!");
                    return res.send(err.message);
                }
                else if(!result){
                    req.flash('error',"Password not matched ..!!");
                    return res.status(401).send("password not matched");
                }
                else{
                    // let token =jwt.sign({email,id:user._id},"myDarling", {expiresIn: '1h'});
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/index/shop");
                }
            })
        }
        
}catch(err){
    console.log(err.message);
}
}


module.exports.logout = (req,res)=>{
    res.cookie("token", "");
    res.redirect("/index")
}