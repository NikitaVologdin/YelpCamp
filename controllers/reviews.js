const Review = require("../models/reviewSchema");
const Campground = require("../models/campSchema");

module.exports.newReview = async (req, res) => {
  const userId = req.user._id;
  const review = new Review(req.body.review);
  review.author = userId;
  const { id } = req.params;
  const campground = await Campground.findById(id);
  campground.reviews.push(review._id);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);
};
