const express=require("express");
const router=express.Router();
const outingController=require("../controlers/outing");
const { isLoggedIn, isStudent, isWarden } = require("../middleware");
const wrapAsync = require("../util/wrapAsync");

router
    .route("/newouting")
    .get(isLoggedIn,isStudent,outingController.renderOutingForm)
    .post(isLoggedIn,isStudent,wrapAsync(outingController.newOuting));

router.get("/alloutings",isLoggedIn,isWarden,wrapAsync(outingController.allOutingsPage));


router.get("/:id",isLoggedIn,isWarden,wrapAsync(outingController.outingPage))

router.post("/:id/accept",isLoggedIn,isWarden,wrapAsync(outingController.acceptOuting));
router.post("/:id/reject",isLoggedIn,isWarden,wrapAsync(outingController.rejectOuting));

module.exports=router;