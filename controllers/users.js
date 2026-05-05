const User=require("../models/user.js")


// signup render form controller
module.exports.renderSignUpForm=(req, res) => {
  res.render("users/signup"); // check path
}

// signup post controller
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });

    const registeredUser = await User.register(newUser, password);

    // Auto login after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });

  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// login reder form 
module.exports.renderLoginForm=(req, res) => {
  res.render("users/login"); // check path
}

// login--post controller
module.exports.login=async(req,res)=>{
        req.flash("success","welcome back to wanderlust! you are logged in");
        let redirectUrl=res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl)
}

// logout controller
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","you are logged out!")
        res.redirect("/listings")
    })
}