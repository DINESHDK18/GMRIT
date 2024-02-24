const express=require("express");
const router=express.Router();
const roomController=require("../controlers/room");
const { isLoggedIn, validateRoom, isWarden, isStudent } = require("../middleware");
const wrapAsync = require("../util/wrapAsync");

router
    .route("/newroom")
    .get(isLoggedIn,isWarden,roomController.renderNewRoomForm)
    .post(isLoggedIn,isWarden,validateRoom,wrapAsync(roomController.newRoom));

router.get("/allrooms",isLoggedIn,isWarden,wrapAsync(roomController.renderAllrooms));

router.get("/avalilableRooms",isLoggedIn,isStudent,wrapAsync(roomController.renderAvailableRooms));

router.get("/:id/register",isLoggedIn,isStudent,roomController.roomRegistrationForm)
    .post("/:id/register",isLoggedIn,isStudent,roomController.roomRegister);

router.get("/:id",isLoggedIn,isWarden,wrapAsync(roomController.renderRoomDetails));

module.exports=router;
