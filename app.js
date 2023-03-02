if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");
const engine = require("ejs-mate");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const ExpressError = require("./utilities/ExpressError");
const homeRoutes = require("./routes/home");
const campgroundsRoutes = require("./routes/campground");
const reviewsRoutes = require("./routes/reviews");
const userRoutes = require("./routes/user");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userSchema");
const mongoSanitize = require("express-mongo-sanitize");

app.engine("ejs", engine);
app.set("view enginge", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "foo",
    resave: true,
    saveUninitialized: true,
    cookie: {
      name: "session",
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  if (!["/user/login", "/"].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl;
  }

  res.locals.signedUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", homeRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);
app.use("/user", userRoutes);

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Something went wrong";
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
  next(err);
});

app.listen("3000", ['192.168.0.51' || 'localhost'] , () => {
  console.log(`Server started on port ${3000}`);
});
