const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const { storage } = require("../cloudinary/index");
const multer = require("multer");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("campground[images]"),
    validateCampground,
    catchAsync(campgrounds.saveNewCampground)
  );

router.get("/new", isLoggedIn, campgrounds.newCampgroundForm);
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("campground[images]"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.editCamoground)
);

router
  .route("/:id/images")
  .get(catchAsync(campgrounds.showEditImages))
  .post(upload.array("campground[images]"), catchAsync(campgrounds.editImages));

module.exports = router;
