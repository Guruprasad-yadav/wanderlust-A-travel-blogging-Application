const express=require("express")
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utlils/wrapAsync.js");
const passport=require('passport');
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");

router.route("/signup")
    // signup form
    .get(userController.renderSignUpForm)
    // signup post
    .post(wrapAsync(userController.signup));


router.route("/login")
    // get route--login
    .get(userController.renderLoginForm)
    // post route--login
    .post(
        saveRedirectUrl,
        passport.authenticate('local',
            {failureRedirect:'/login',
                failureFlash:true,
            }),
            userController.login
    )

router.get("/logout",userController.logout)
module.exports = router;   