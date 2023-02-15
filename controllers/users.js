const User = require("../models/userSchema");

module.exports.registerForm = (req, res) => {
  res.render("./user/register.ejs");
};

module.exports.loginForm = (req, res) => {
  res.render("./user/login.ejs");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/user/register");
  }
};

module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.flash("succes", "You successfully loged out");
  res.redirect("/campgrounds");
};
