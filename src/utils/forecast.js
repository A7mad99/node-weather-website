const request = require("request");
const forecast = (lati, long, callback) => {
  const url = `https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/${lati},${long}?units=si`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        placename: response.body.daily.data[0].summary,
        temperature: response.body.currently.temperature,
        Rainchance: response.body.currently.precipProbability,
      });
    }
  });
};

module.exports = forecast;
