const Campground = require("../models/campSchema");
const { cloudinary } = require("../cloudinary/index");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxGeocoding({
  accessToken: process.env.MAPBOX_TOKEN,
});

module.exports.index = async (req, res) => {
  const camps = await Campground.find({});
  res.render("campgrounds/index.ejs", { camps });
};

module.exports.newCampgroundForm = (req, res) => {
  res.render("campgrounds/new.ejs");
};

module.exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("campgrounds/show.ejs", { camp });
};

module.exports.editCamoground = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);

  if (!camp) {
    req.flash("error", "Cannot fiund that campground");
    return res.redirect("/campgrounds");
  }

  res.render("campgrounds/edit.ejs", { camp });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });

  req.flash("success", "Successfully edited a campground!");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.saveNewCampground = async (req, res) => {
  const body = req.body.campground;
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  campground.images = req.files.map((f) => ({
    filename: f.filename,
    url: f.path,
  }));
  const geoData = await geocoder
    .forwardGeocode({ query: `${body.address} ${body.city}`, limit: 1 })
    .send();

  campground.geometry = geoData.body.features[0].geometry;
  await campground.save();
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a campground!");
  res.redirect("/campgrounds");
};

module.exports.showEditImages = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/images.ejs", { campground });
};

module.exports.editImages = async (req, res) => {
  const { id } = req.params;

  const campground = await Campground.findById(id);

  const addedImages = req.files.map((f) => ({
    filename: f.filename,
    url: f.path,
  }));

  campground.images.push(...addedImages);
  campground.save();

  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

  req.flash("success", "Successfully edited photos!");
  res.redirect(`/campgrounds/${id}`);
};
