mapboxgl.accessToken = mapToken;
const campground = campgroundJSON;
const coordinates = campground.geometry.coordinates;

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
  `Tel: <a href="tel:${campground.telephone}">${campground.telephone}</a><br>
  Email: <a href="mailto:${campground.email}">${campground.email}</a><br>
  Price: ${campground.price}`
);

const marker1 = new mapboxgl.Marker()
  .setLngLat(coordinates)
  .setPopup(popup)
  .addTo(map);
