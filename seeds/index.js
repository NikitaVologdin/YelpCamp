const mongoose = require("mongoose");
const Campground = require("../models/campSchema");
const cities = require("./cities");
const seedHelper = require("./seedHelper");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const imgs = require("./imgs");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
}

main().catch((err) => console.log(err));


const random100 = function (arr) {
  const num = Math.floor(Math.random() * 100);
  return arr[num];
};

const randomTitle = function (arr) {
  const num = Math.floor(Math.random() * arr.length);
  return arr[num];
};

const randomPrice = function () {
  return Math.floor(Math.random() * 20) + 10;
};

const seedDb = async function (amount) {

  for (let i = 0; i < amount; i++) {
    const city = random100(cities);
    const camp = new Campground({
      title: `${randomTitle(seedHelper.descriptors)} ${randomTitle(
        seedHelper.places
      )}`,
      images: [
        {
          filename: "mhe4wnvjbcxapdjj7swv",
          url: "https://res.cloudinary.com/dojvgjueu/image/upload/v1679808292/YelpCamp/mhe4wnvjbcxapdjj7swv.jpg",
        },
        {
          filename: "gy6gngcp6go0mqpujbl6",
          url: "https://res.cloudinary.com/dojvgjueu/image/upload/v1679808292/YelpCamp/gy6gngcp6go0mqpujbl6.jpg",
        },
      ],
      telephone: 27715207,
      email: 'nvologdins@gmail.com',
      description: lorem.generateParagraphs(3),
      price: +randomPrice(),
      city: city.asciiname,
      address: city.asciiname,
      geometry: {
        type: "Point",
        coordinates: [city.longitude, city.latitude],
      },
      author: "6385cb95769c4c0d32f1bd17",
    });
    await camp.save();
  }
};

console.log("Seeding is done!");

Campground.deleteMany({}).then(() => {
  seedDb(100).then(() => {
    mongoose.connection.close();
  });
});
