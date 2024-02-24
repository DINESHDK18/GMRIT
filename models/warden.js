const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PassportLocalMongoose=require("passport-local-mongoose");


const warderSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    outingRequest:{
        type:Schema.Types.ObjectId,
        ref:"Outing",
    }
})

warderSchema.plugin(PassportLocalMongoose);
const Warden=mongoose.model("Warden",warderSchema);
module.exports=Warden;