import mapboxgl from 'mapbox-gl';

export default function renderMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWthdGVyaW5hLWpqIiwiYSI6ImNrYWo1cTIyMjAzbzAycm82aWtmbGg5czQifQ.h5rwDJl1TI1cpavvqn4fOQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [54.3667, 24.4667], // starting position [lng, lat]
    zoom: 10, // starting zoom
  });

  const marker = new mapboxgl.Marker();
  marker.setLngLat([54.3667, 24.4667]);
  marker.addTo(map);
}
