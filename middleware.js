const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must logged in to create listing!");
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
        if(req.session.redirectUrl) {
            res.locals.redirectUrl=req.session.redirectUrl;
        }
        next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error","yor are the not owner of review")
        return res.redirect(`/listings/${id}`)
    }
    next();
}