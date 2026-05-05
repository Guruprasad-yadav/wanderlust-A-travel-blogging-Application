if(process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express=require("express")
const app=express()
const mongoose= require("mongoose")
const path=require("path");
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const wrapAsync=require("./utlils/wrapAsync.js");
const ExpressError=require("./utlils/ExpressError.js");
const {listingSchema, reviewSchema}=require("./schema.js")

const Listing=require("./models/listing.js");
const Review=require("./models/review.js")
const user=require("./models/user.js")

const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/review.js")
const userRouter=require("./routes/user.js")

const session=require('express-session');
const MongoStore = require("connect-mongo").default;
const flash=require("connect-flash");
const passport=require("passport")  //ఇది main authentication library
const LocalStrategy=require("passport-local");   //normal local metthod...LocalStrategy = username + password login system


// connecting mongoDB database
// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust-Blogging";

const dbUrl=process.env.ATLASDB_URL;
main()
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((err)=>{
        console.log(err)
    })

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,'/public')))


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {   // ✅ add err parameter
  console.log("❌ ERROR IN MONGO SESSION STORE:", err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET, //Session data ని encrypt / sign చేయడానికి ఉపయోగిస్తారు like security purpose...
    resave:false, //false → session change అయినప్పుడు మాత్రమే save అవుతుంది ✅
    saveUninitailized: true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true,
    }
}

app.get('/',(req,res)=>{
    res.redirect("/listings");
})


app.use(session(sessionOptions));
// Web apps “stateless” ఉంటాయి (server user ని remember చేయదు by default)
// కానీ మనం user login, cart, preferences etc. remember చేయాలి
app.use(flash());

app.use(passport.initialize()); //ఇది Passport ని start చేస్తుంది
app.use(passport.session());    //ఇది login session handle చేస్తుంది
passport.use(new LocalStrategy(user.authenticate())); //ఇది login logic set చేస్తుంది

passport.serializeUser(user.serializeUser());   //once we logged-in. what type of data is stored in session it decides..(only id stores not entire data..)
passport.deserializeUser(user.deserializeUser()); //ప్రతి request వచ్చినప్పుడు,session లో ఉన్న ID తీసుకుని.database నుంచి full user data తీసుకొస్తుంది

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;  
    next();
})

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter);

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message='something went wrong..'}=err;
    res.status(statusCode).send(message)
})

// starts server at port 8080..
app.listen(8080,()=>{
    console.log("server is listening at the port 8080..");
})
