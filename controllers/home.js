const Campground = require("../models/campSchema");

module.exports.main = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("home.ejs", { campgrounds });
};
