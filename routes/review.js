const express=require("express")
const router=express.Router({mergeParams:true}); //#mergeParams:true  👉 ఇది parent route లో ఉన్న parameters (like :id) ను
//child router లో కూడా ఉపయోగించడానికి అనుమతిస్తుంది.
const wrapAsync=require("../utlils/wrapAsync.js");
const ExpressError=require("../utlils/ExpressError.js");
const {listingSchema, reviewSchema}=require("../schema.js")
const Review=require("../models/review.js")
const Listing=require("../models/listing.js");
const {isLoggedIn,isReviewAuthor}=require("../middleware.js")

const reviewsController=require("../controllers/reviews.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);

    if(error) {
        throw new ExpressError(400,error);
    } else{
        next()
    }
}

// reviews
// posts route

router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewsController.createReview));


// delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewsController.destroyReviews));

module.exports=router;