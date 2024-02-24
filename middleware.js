
const {roomSchema}=require("./joiSchema");
const Student = require("./models/student");
const Warden = require("./models/warden");
const ExpressError=require("./util/ExpressError");

module.exports.validateRoom= (req,res,next)=>{
    let {error}= roomSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg); 
    }else{
        next();
    }
}

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must login/signup before using");
        return res.redirect("/student/login");
    }else{
        next();
    }
}

module.exports.isWarden=(req,res,next)=>{

    if(req.user && req.user.constructor.modelName.toLowerCase()!=='warden'){
        req.flash("error","only warden can access this page");
        return res.redirect("/warden/login");
    }
    next();
}

module.exports.isStudent=(req,res,next)=>{
    if(req.user && req.user.constructor.modelName.toLowerCase() !=="student"){
        req.flash("error","only student can access this page");
        return res.redirect("/warden/login");
    }
    next();
}
// module.exports.isOriginalWarden= async (req,res,next)=>{
//     const {id}=req.params;
//     const warden=await Warden.findById(id);
//     if(!(warden._id!=req.user._id)){
//         req.flash("error","you cannot access this page");
//         return res.redirect("/warden/login");
//     }
//     next();
// }
// module.exports.isOriginalStudent= async (req,res,next)=>{
//     const {id}=req.params;
//     const student=await Student.findById(id);
//     if(!(student._id!=req.user._id)){
//         req.flash("error","you cannot access this page");
//         return res.redirect("/student/login");
//     }
//     next();
// }