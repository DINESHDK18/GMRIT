const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const outingScheam=new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:"Student",
    },
    outingDate:{
        type:String,
        required:true,
    },
    outingTime:{
        type:String,
        required:true,
    },
    inDate:{
        type:String,
        required:true,
    },
    inTime:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    approvedBy:{
        type:Schema.Types.ObjectId,
        ref:"Warder",
    }
})

const Outing=mongoose.model("Outing",outingScheam);
module.exports=Outing;