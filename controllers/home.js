const Campground = require("../models/campSchema");

module.exports.main = async (req, res) => {
  const campgrounds = await Campground.find({});

  const mapboxData = makeData(campgrounds);
  res.render("home.ejs", { mapboxData });
};

function makeData(model) {
  const features = []

  for (let doc of model) {
    features.push({
      geometry: doc.geometry,
      properties: {
        title: doc.title,
        telephone: doc.telephone,
        email: doc.email,
        link: `/campgrounds/${doc._id}`,
      },
    });
  }

  return JSON.stringify({ features });
}