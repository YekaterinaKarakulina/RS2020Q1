
function translateCoordinate(coordinate) {
  let geoCoordinate = coordinate;
  if (coordinate < 0) {
    geoCoordinate = Math.abs(coordinate);
  }
  const degrees = Math.floor(geoCoordinate);
  let remainder = geoCoordinate - degrees;
  const minutes = Math.floor(remainder * 60);
  remainder = remainder * 60 - minutes;
  const seconds = Math.floor(remainder * 60);
  return `${degrees}°${minutes}'${seconds}''`;
}

export default function translateCoordinates(lat, lng) {
  let latSign = 'N';
  let lngSign = 'E';

  if (lat < 0) {
    latSign = 'S';
  }
  if (lng < 0) {
    lngSign = 'W';
  }

  const latitude = `${translateCoordinate(lat)}${latSign}`;
  const longitude = `${translateCoordinate(lng)}${lngSign}`;

  return { latitude, longitude };
}
