const Room=require("../models/room");
const Student = require("../models/student");

module.exports.renderNewRoomForm=(req,res)=>{
    res.render("home/newRoom.ejs");
}

module.exports.newRoom=async (req,res)=>{
    const {room}=req.body;
    const newRoom=new Room(room);
    await newRoom.save();
    req.flash("success","new Room is added");
    res.redirect("/home");
}

module.exports.renderAllrooms=async (req,res)=>{
    const rooms=await Room.find();
    res.render("home/allRoom.ejs",{rooms});
}

module.exports.renderAvailableRooms=async (req,res)=>{
    const rooms=await Room.find();
    res.render("home/availableRooms.ejs",{rooms});
}


module.exports.roomRegistrationForm=async  (req,res)=>{
    const {id}=req.params;
    const room=await Room.findById(id);
    res.render("home/registerRoom.ejs",{room});
}

module.exports.roomRegister = async (req,res)=>{
    const {id}=req.params;
    const room=await Room.findById(id);
    const user=await Student.findById(req.user._id);
    if(room.allotedStudents && (room.noofStudents==room.allotedStudents.length)){
        req.flash("error","this room is full");
        return res.redirect("/rooms/avalilableRooms");
    }
    
    room.allotedStudents.push(req.user._id);
    user.room=room._id;

    await room.save();
    await user.save();
    req.flash("success","your room is registerd");
    res.redirect("/home");
}

module.exports.renderRoomDetails=async (req,res)=>{
    const {id}=req.params;
    const room=await Room.findById(id).populate("allotedStudents");
    res.render("home/room.ejs",{room});

}