const {createApi} = require('unsplash-js')
const fetch = require('node-fetch')
const URL = require("url").URL;
require("dotenv").config();


const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});

unsplash.photos.getRandom({ query: "camping", count: 2, }).then((result) => {
  if (result.errors) {
    console.log("error occurred: ", result.errors[0]);
  } else {
    const photos = result.response;
    console.log(photos);
  }
});



// module.exports = getImages
