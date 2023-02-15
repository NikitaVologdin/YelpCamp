const form = document.querySelector("form");
const longitude = document.querySelector("#longitude");
const latitude = document.querySelector("#latitude");

const ACCESS_TOKEN =
  "pk.eyJ1IjoibnZvbG9nZGlucyIsImEiOiJjbGRrMDJ3cjcwNDY1M3pxeG1yOXR3cnNuIn0.v14z3Phyd7u4tIe7pODkJA";

mapboxsearch.autofill({
  accessToken: ACCESS_TOKEN,
  options: {
    country: "LV",
  },
});
