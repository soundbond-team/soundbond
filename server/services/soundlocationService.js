const db = require("../models");
const SoundLocation = db.SoundLocation;
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

function nearestPosition(localisation, positions) {
  let allPositions = positions;
  let distance_list = [];
  let nearestPositions = [];
  for (var i = 0; i < allPositions.length; i++) {
    let element = {};
    element.id = allPositions[i];
    element.value = distance(
      localisation.latitude,
      localisation.longitude,
      allPositions[i].latitude,
      allPositions[i].longitude,
      "K"
    );
    distance_list[i] = element;
  }

  let x = distance_list.sort(function (a, b) {
    return parseFloat(a.value) - parseFloat(b.value);
  });

  for (i = 1; i < 3; i++) {
    nearestPositions.push(x[i].id);
  }
  console.log(nearestPositions);
  return nearestPositions;
}
module.exports = { nearestPosition, distance };
