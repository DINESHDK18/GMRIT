const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const studentController=require("../controlers/student");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const {isLoggedIn, isWarden}=require("../middleware");

router
    .route("/signup")
    .get(studentController.renderStudentSignupPage)
    .post(wrapAsync(studentController.StudentSignup));

router
    .route("/login")
    .get(studentController.renderStudentLogin)
    .post(passport.authenticate('student-local',{failureFlash:true,failureRedirect:"/student/login"}),studentController.loginStudent);

router.get("/logout",wrapAsync(studentController.logout));

router.get("/allstudents",isLoggedIn,isWarden,wrapAsync(studentController.allStudents));

router.get("/:id",wrapAsync(studentController.student));

module.exports=router;