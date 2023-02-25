const Campground = require("../models/campSchema");

module.exports.main = async (req, res) => {
  const campgrounds = await Campground.find({});
  const properties = campgrounds[1].properties;
  console.log(campgrounds);
  res.render("home.ejs", { campgrounds });
};
