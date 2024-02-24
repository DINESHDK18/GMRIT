const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PassportLocalMongoose=require("passport-local-mongoose");


const studentScheam=new Schema({
    year:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    jntu_no:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    parentEmail:{
        type:String,
        required:true,
    },
    room:{
        type:Schema.Types.ObjectId,
        ref:"Room"
    },
    outings:[
        {
            type:Schema.Types.ObjectId,
            ref:"Outing",
        }
    ],
    

})

studentScheam.plugin(PassportLocalMongoose);

const Student=mongoose.model("Student",studentScheam);
module.exports=Student;