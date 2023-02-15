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
  `Tel: 27715207<br>Email: nvologdins@gmail.com<br>Price: ${campground.price}`
);

const marker1 = new mapboxgl.Marker()
  .setLngLat(coordinates)
  .setPopup(popup)
  .addTo(map);
