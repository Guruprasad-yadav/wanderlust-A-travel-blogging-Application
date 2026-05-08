const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.showProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const totalListings = await Listing.countDocuments({ owner: req.user._id });
        const totalReviews = await Review.countDocuments({ author: req.user._id });

        res.render("profile/show.ejs", { user, totalListings, totalReviews });
    } catch (err) {
        req.flash("error", "Could not load profile");
        res.redirect("/listings");
    }
};

module.exports.renderEditForm = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.render("profile/edit.ejs", { user });
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/profile");
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        const { fullName, bio, phone, location } = req.body;
        const user = await User.findById(req.user._id);

        user.fullName = fullName;
        user.bio = bio;
        user.phone = phone;
        user.location = location;

        if (req.file) {
            user.profileImage = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await user.save();
        req.flash("success", "Profile updated successfully!");
        res.redirect("/profile");
    } catch (err) {
        req.flash("error", "Could not update profile");
        res.redirect("/profile/edit");
    }
};
