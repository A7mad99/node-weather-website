const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWhtYWQtYWJ1YWxydWI3IiwiYSI6ImNrZDJzaWhiYjFnbWMyc3A0aXp2b28zcGkifQ.hbUtwlOGMDjSlXgOCYBjZg`;
  request({ url: url, json: true }, (error, Response) => {
    if (error) {
      callback("no internet conn", undefined);
    } else if (Response.body.features.length === 0) {
      callback("unable to get data", undefined);
    } else {
      callback(undefined, {
        latitude: Response.body.features[0].center[0],
        longitude: Response.body.features[0].center[1],
        location: Response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
