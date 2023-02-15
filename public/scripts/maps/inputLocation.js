const inputLocation = document.querySelector("#address");
const suggestionsDiv = document.querySelector(".location__suggestions");
const suggestionsList = document.querySelector(".suggestions__list");
const form = document.querySelector("form");

inputLocation.addEventListener("focus", () => {
  suggestionsDiv.classList.remove("d-none");
});

inputLocation.addEventListener("input", (event) => {
  cleanList(suggestionsList);

  getSuggestions(event.target.value).then(function (result) {
    const suggestions = result.features;

    for (let suggestion of suggestions) {
      const a = document.createElement("a");
      a.classList.add("list-group-item");
      a.innerText = suggestion.place_name;
      a.coordinates = suggestion.geometry.coordinates;
      suggestionsList.appendChild(a);
    }
  });
});

suggestionsList.addEventListener("click", (event) => {
  const target = event.target;
  suggestionsDiv.classList.add("d-none");
  inputLocation.value = target.innerText;
  inputLocation.coordinates = target.coordinates;
});

// form.addEventListener("submit", () => {
//   inputLocation.value = inputLocation.coordinates;
// });

async function getSuggestions(value) {
  const token =
    "pk.eyJ1IjoibnZvbG9nZGlucyIsImEiOiJjbGRrMDJ3cjcwNDY1M3pxeG1yOXR3cnNuIn0.v14z3Phyd7u4tIe7pODkJA";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?limit=3&access_token=${token}`;

  let response = await fetch(url);
  let json = await response.json();
  return json;
}

function cleanList(list) {
  let child = list.lastElementChild;

  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibnZvbG9nZGlucyIsImEiOiJjbGRrMDJ3cjcwNDY1M3pxeG1yOXR3cnNuIn0.v14z3Phyd7u4tIe7pODkJA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
