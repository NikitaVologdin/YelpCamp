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
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const favicon = require("serve-favicon");

app.engine("ejs", engine);
app.set("view enginge", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp";
const secret = process.env.SECRET || "thisisgreatestsecretintheworld";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret,
  },
  touchAfter: 24 * 60 * 60,
});
store.on("error", (err) => console.log(err));

app.use(
  session({
    store,
    secret,
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

// app.use(helmet());

// const scriptSrcUrls = [
//   "https://stackpath.bootstrapcdn.com/",
//   "https://api.tiles.mapbox.com/",
//   "https://api.mapbox.com/",
//   "https://kit.fontawesome.com/",
//   "https://cdnjs.cloudflare.com/",
//   "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//   "https://kit-free.fontawesome.com/",
//   "https://stackpath.bootstrapcdn.com/",
//   "https://api.mapbox.com/",
//   "https://api.tiles.mapbox.com/",
//   "https://fonts.googleapis.com/",
//   "https://use.fontawesome.com/",
// ];
// const connectSrcUrls = [
//   "https://api.mapbox.com/",
//   "https://a.tiles.mapbox.com/",
//   "https://b.tiles.mapbox.com/",
//   "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", "blob:"],
//       objectSrc: [],
//       imgSrc: [
//         "'self'",
//         "blob:",
//         "data:",
//         "https://res.cloudinary.com/douqbebwk/",
//         "https://images.unsplash.com/",
//       ],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );

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
mongoose.connect(dbUrl, {
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

app.listen(process.env.PORT, ["192.168.0.51" || "localhost"], () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
