const bar = document.querySelector("#searchBar");

bar.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = event.target.elements[0].value;
  const data = fetchData(value);
  data.then((result) => {
    console.log(result.features[0].geometry.coordinates);
    map.flyTo({ center: result.features[0].geometry.coordinates, zoom: 10 });
  });
});
