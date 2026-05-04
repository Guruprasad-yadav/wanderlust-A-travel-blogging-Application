const Listing=require("../models/listing")
const Review=require("../models/review")

// posts reviews controller
module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    newReview.save();
    await listing.save();
    req.flash("success","New Review created")
    res.redirect(`/listings/${listing._id}`)
}

// delete review controller
module.exports.destroyReviews=async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    // Delete review from Review collection
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`);
}