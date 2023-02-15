const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.registerForm)
  .post(catchAsync(users.registerUser));

router
  .route("/login")
  .get(users.loginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/user/login",
      keepSessionInfo: true,
    }),
    users.loginUser
  );

router.get("/logout", users.logoutUser);

module.exports = router;
