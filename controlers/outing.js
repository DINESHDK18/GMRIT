const Outing=require("../models/outing");
const Student = require("../models/student");


module.exports.renderOutingForm=(req,res)=>{
    res.render("home/outingform.ejs");
}

module.exports.newOuting=async (req,res)=>{

    const {outing}=req.body;
    const student=await Student.findById(req.user._id);
    const newOuting=new Outing(outing);

    newOuting.student=req.user._id;
    newOuting.status='Pending';
    const regouting=await newOuting.save();
    student.outings.push(regouting._id);
    await student.save();

    req.flash("success","you outing is created");
    res.redirect("/home");
}

module.exports.allOutingsPage=async (req,res)=>{
    const outings=await Outing.find({status:'Pending'}).populate("student");
    res.render("home/alloutings.ejs",{outings});
}

module.exports.outingPage=async (req,res)=>{
    const {id}=req.params;
    const outing=await Outing.findById(id).populate("student");
    res.render("home/outing.ejs",{outing});
}

module.exports.acceptOuting= async (req,res)=>{
    const {id}=req.params;
    const outing=await Outing.findById(id).populate('student');
    outing.status="Accept";
    outing.approvedBy=req.user._id;
    await outing.save();
    req.flash("success","outing updated");
    res.redirect("/outing/alloutings");
}

module.exports.rejectOuting= async (req,res)=>{
    const {id}=req.params;
    const outing=await Outing.findById(id).populate('student');
    outing.status="Reject";
    outing.approvedBy=req.user._id;
    await outing.save();
    req.flash("success","outing updated");
    res.redirect("/outing/alloutings");
}