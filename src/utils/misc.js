function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return Math.abs(Math.round((d + Number.EPSILON) * 100) / 100);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// TODO This doesn't work yet
function calculateDistance(longitude1, latitude1, longitude2, latitude2) {
    let c = 
        Math.sin(Math.toRadians(latitude1)) *
        Math.sin(Math.toRadians(latitude2)) +
            Math.cos(Math.toRadians(latitude1)) *
            Math.cos(Math.toRadians(latitude2)) *
            Math.cos(Math.toRadians(longitude2) - 
                Math.toRadians(longitude1));
    c = c > 0 ? Math.min(1, c) : Math.max(-1, c);
    return 3959 * 1.609 * 1000 * Math.acos(c);
}

function checkInside(circle, longitude, latitude) {
        return calculateDistance(
            circle.getLongitude(), circle.getLatitude(), longitude, latitude
        ) < circle.getRadius();}

module.exports = {
  getDistanceFromLatLonInKm,
  checkInside
};
