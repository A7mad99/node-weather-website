const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const PORT = process.env.PORT || 3000;
const app = express();
//define paths for express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");
app.set("port", PORT);
//setup handlebar engine & views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partials);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "ahmad ",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "about weather app", name: "ahmad " });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page ",
    contact: "contact us",
    name: "ahmad ",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "u must add address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errormsg: "help not found",
  });
});
app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    errormsg: "page not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}.`);
});
