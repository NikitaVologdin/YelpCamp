const inputLocation = document.querySelector("#searchBar");
const suggestionsDiv = document.querySelector("#searchBar-suggestions");
const suggestionsList = document.querySelector("#searchBar-list");

// const customSearch = document.querySelector("#searchBar");

// customSearch.addEventListener("input", (event) => {});

// const geocoderSearch = document.querySelector(".mapboxgl-ctrl-geocoder--input");

// inputLocation.addEventListener("focus", () => {
//   suggestionsDiv.classList.remove("d-none");
// });

inputLocation.addEventListener("input", (event) => {
  cleanList(suggestionsList);

  fetchData(event.target.value).then(function (result) {
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

async function fetchData(value) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?limit=3&access_token=${mapToken}`;

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
