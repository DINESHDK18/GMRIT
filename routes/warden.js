const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const wardenController=require("../controlers/warden");
const { route } = require("./student");
const passport=require("passport");
const {isLoggedIn, isWarden, isOriginalWarden} =require("../middleware");

router
    .route("/signup")
    .get(wardenController.renderWardenSignup)
    .post(wrapAsync(wardenController.wardenSignup));

router
    .route("/login")
    .get(wardenController.renderWarderLoginPage)
    .post(passport.authenticate('warden-local',{failureFlash:true,failureRedirect:"/warden/login"}),wardenController.loginwarden);

router.get("/:id",isLoggedIn,isWarden,wardenController.warden);

module.exports=router;