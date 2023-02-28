const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./reviewSchema");

const ImageSchema = new Schema({
  filename: String,
  url: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  address: String,
  price: Number,
  telephone: Number,
  email: String,
  description: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
