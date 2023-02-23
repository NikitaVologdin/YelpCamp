const form = document.querySelector("#searchForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchHandler();
});

function searchHandler() {
  const value = form.elements[0].value;
  const data = fetchData(value);
  data.then((result) => {
    map.flyTo({
      center: result.features[0].geometry.coordinates,
      zoom: 10,
    });
  });
  searchInput.value = "";
  cleanList(suggestionsList);
}
