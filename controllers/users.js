

// signup render form controller
module.exports.renderSignUpForm=(req, res) => {
  res.render("users/signup"); // check path
}

// signup post controller
module.exports.signup=async(req,res)=>{
    try {
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registerdUser=await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err) {
                return next(err);
            }
            req.flash("success","welcome to Wanderlust")
            res.redirect("/listings");
        })
        
    } catch(error) {
        req.flash("error",error.message)
        res.redirect("/signup")
    }
}

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