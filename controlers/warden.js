const Warden=require("../models/warden");


module.exports.renderWardenSignup=(req,res)=>{
    res.render("home/wardenSignup.ejs");
}

module.exports.wardenSignup=async(req,res)=>{
    const {warden,password}=req.body;
   
    const newWarden=new Warden(warden);
    newWarden.isWarden=true;
    const registerWarden= await Warden.register(newWarden,password);
    req.login(registerWarden,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you successfull sign up as warden");
        return res.redirect("/home");
    });
}

module.exports.renderWarderLoginPage=(req,res)=>{
    res.render("home/wardenLogin.ejs");
}

module.exports.loginwarden=async(req,res)=>{
    req.flash("success","you succesfully login as warden")
    res.redirect("/home");
}

module.exports.warden= async (req,res)=>{
    const {id}=req.params;
    const warden=await Warden.findById(id).populate("outingRequest");
    res.render("home/warden.ejs",{warden});
}