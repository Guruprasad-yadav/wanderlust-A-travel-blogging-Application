const User = require("../models/user.js");
const passport = require('passport');

// signup render form controller
module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup", { errors: {}, formData: {} });
};

// signup post controller
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    
    // Trim and process inputs
    username = username ? username.trim() : "";
    email = email ? email.trim().toLowerCase() : "";

    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validation
    if (!usernameRegex.test(username)) {
      errors.username = "Username must be 3-20 characters (letters, numbers, underscores).";
    }
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      errors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }

    // Check existing email
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      errors.email = "Email is already registered.";
    }

    if (Object.keys(errors).length > 0) {
      return res.render("users/signup", { errors, formData: { username, email } });
    }

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Auto login after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });

  } catch (err) {
    res.render("users/signup", { 
      errors: { general: err.message }, 
      formData: { username: req.body.username, email: req.body.email } 
    });
  }
};

// login reder form 
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login", { errors: {}, formData: {} });
}

// login--post controller
module.exports.login = async (req, res, next) => {

    let { username, password } = req.body;

    const errors = {};

    // Username validation
    if (!username || username.trim() === "") {
        errors.username = "Username cannot be empty.";
    }

    // Password validation
    if (!password || password.trim() === "") {
        errors.password = "Password cannot be empty.";
    }

    // Show inline errors
    if (Object.keys(errors).length > 0) {
        return res.render("users/login", {
            errors,
            formData: { username }
        });
    }

    // Passport authentication
    passport.authenticate("local", (err, user, info) => {

        if (err) {
            return next(err);
        }

        // Invalid credentials
        if (!user) {

            errors.general =
                info?.message || "Invalid username or password.";

            return res.render("users/login", {
                errors,
                formData: { username }
            });
        }

        // Login user
        req.login(user, (loginErr) => {

            if (loginErr) {
                return next(loginErr);
            }

            req.flash(
                "success",
                "Welcome back to Wanderlust! You are logged in."
            );

            let redirectUrl =
                res.locals.redirectUrl || "/listings";

            res.redirect(redirectUrl);
        });

    })(req, res, next);
};

// logout controller
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!")
    res.redirect("/listings")
  })
}
