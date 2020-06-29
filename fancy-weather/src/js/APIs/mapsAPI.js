import mapboxgl from 'mapbox-gl';

export default function renderMap(lat, lng) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWthdGVyaW5hLWpqIiwiYSI6ImNrYWo1cTIyMjAzbzAycm82aWtmbGg5czQifQ.h5rwDJl1TI1cpavvqn4fOQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: 10,
  });

  const marker = new mapboxgl.Marker();
  marker.setLngLat([lng, lat]);
  marker.addTo(map);
}
