const fs = require('fs');

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

function findFileName (directory, fileName) {
	if (!fs.existsSync(directory)) {
        console.log("no dir ", directory);
        return;
    }

    const files = fs.readdirSync(directory);
	return files.filter(s => s.includes(fileName));
}

function deleteFile (path) {
	fs.unlinkSync(path);
}


module.exports = {
  getDistanceFromLatLonInKm,
  findFileName,
  deleteFile
};
