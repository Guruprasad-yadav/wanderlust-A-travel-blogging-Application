const express=require("express")
const router=express.Router();
const wrapAsync=require("../utlils/wrapAsync.js");
const ExpressError=require("../utlils/ExpressError.js");
const {listingSchema, reviewSchema}=require("../schema.js")
const Listing=require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const listingController= require("../controllers/listing.js");

const multer  = require('multer')
const {storage}=require("../cloudinary.js")
const upload = multer({storage})



const validateLising=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400,error);
    } else{
        next()
    }
}

router.route("/")
    // index route
    .get(wrapAsync(listingController.index))
    // create route
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateLising,
        wrapAsync(listingController.createListing)
);


// new route
router.get("/new",isLoggedIn,listingController.renderNewForm)

router.route("/:id")
// show route
    .get(wrapAsync(listingController.showListing))
    // update route
    .put(isLoggedIn,validateLising,upload.single('listing[image]'),wrapAsync(listingController.updateListing))
    // delete route
    .delete(isLoggedIn,wrapAsync(listingController.destroyListing));

// edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));

module.exports=router;