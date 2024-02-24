const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const roomSchema=new Schema({
    hosterBlock:{
        type:String,
        required:true,
    },
    floorNo:{
        type:Number,
        required:true,
    },
    roomNo:{
        type:Number,
        required:true,
    },
    roomType:{
        type:String,
        required:true,
    },
    noofStudents:{
        type:Number,
        required:true,
    },
    allotedStudents:[
        {
            type:Schema.Types.ObjectId,
            ref:"Student",
        }
    ]

})

const Room=mongoose.model("Room",roomSchema);
module.exports=Room;