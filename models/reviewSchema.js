const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchmea = new Schema({
  rating: Number,
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Review", reviewSchmea);
