const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utlils/wrapAsync");
const multer = require("multer");
const { userStorage } = require("../cloudinary.js");
const upload = multer({ storage: userStorage });

router.get("/", isLoggedIn, wrapAsync(profileController.showProfile));

router.route("/edit")
    .get(isLoggedIn, wrapAsync(profileController.renderEditForm))
    .put(isLoggedIn, upload.single("profileImage"), wrapAsync(profileController.updateProfile));

module.exports = router;
