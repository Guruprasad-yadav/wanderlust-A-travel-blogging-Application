const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  profileImage: {
    url: {
      type: String,
      default: "https://res.cloudinary.com/daci8uouh/image/upload/v1778253542/wanderlust_USERS/xaqscfzgse4dtzg6tui2.webp"
    },
    filename: {
      type: String,
      default: "default_avatar"
    }
  },
  fullName: String,
  bio: String,
  phone: String,
  location: String,
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);