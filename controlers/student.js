const Student=require("../models/student");
const passport=require("passport");

module.exports.renderStudentSignupPage=(req,res)=>{
    res.render("home/studentSignup.ejs");
}

module.exports.StudentSignup=async(req,res)=>{

    const {student,password}=req.body;
    const newStudent=new Student(student);
    const registerStudent= await Student.register(newStudent,password);
    req.login(registerStudent,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","sign-up is successfull,welcome to Hostel");
        return res.redirect("/home");
    });
        
  
}


module.exports.renderStudentLogin=(req,res)=>{
    res.render("home/studentLogin.ejs");
}

module.exports.loginStudent=(req,res)=>{
    req.flash("success","you successfull login");
    res.redirect("/home");
}

module.exports.logout=async(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/home");
    });
}

module.exports.allStudents=async (req,res)=>{
    const students=await Student.find({isWarden:false});
    res.render("home/allstudents.ejs",{students});
}

module.exports.student=async (req,res)=>{
    const {id}=req.params;
    const student = await Student.findById(id).populate('outings').populate("room");
    res.render("home/student.ejs",{student});
}