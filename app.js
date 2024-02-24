if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const PORT=8080;

const mongoose=require("mongoose");
const session=require("express-session");
const Mongostore=require("connect-mongo");
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");

const Student=require("./models/student");
const Warden=require("./models/warden");

const ExpressError=require("./util/ExpressError");

//routes imports
const student=require("./routes/student");
const warden=require("./routes/warden");
const room=require("./routes/room");
const outing=require("./routes/outing");

const { error } = require("console");



app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

// const db_URL=process.env.DB_URL;
const db_URL='mongodb://127.0.0.1:27017/hosterManage';
async function main(){
    await mongoose.connect(db_URL);
}

main()
    .then((res)=>{
        console.log("connected to database");
    })
    .catch((err)=>{
        console.log(err);
    })


const store=Mongostore.create({
    mongoUrl:db_URL,
    crypto:{
        secret:process.env.SECREAT,
    },
    touchAfter:24*36000
})

store.on("error",()=>{
    console.log("Error on session store");
})


const sessionOptions={
    store,
    secret:process.env.SECREAT,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
}




app.use(flash());
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, { id: user.id, userType: user.constructor.modelName.toLowerCase() });
});
  
passport.deserializeUser(async (userData, done) => {
    const { id, userType } = userData;
    let model;
  
    if (userType === 'student') {
        model = Student;
    } else if (userType === 'warden') {
        model = Warden;
    }
  
    try {
        const user = await model.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
  
passport.use("student-local",new LocalStrategy(Student.authenticate()));
passport.use("warden-local",new LocalStrategy(Warden.authenticate()));





app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    if(req.user){
        res.locals.userType=req.user.constructor.modelName.toLowerCase();
    }else{
        res.locals.userType="";
    }
    next();
});



app.get("/",(req,res)=>{
    res.redirect("/home");
})

app.get("/home",(req,res)=>{
    res.render("home/home.ejs");
})

app.get("/loginSection",(req,res)=>{
    res.render("home/loginsection.ejs");
})

app.use("/student",student);
app.use("/warden",warden);
app.use("/room",room);
app.use("/outing",outing);



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="some err"}=err;
    res.status(status).render("home/error.ejs",{status,message});
});


app.listen(PORT,()=>{
    console.log("Server is listening on port "+PORT);
})