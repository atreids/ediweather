const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const apiKey = "80ec00beb115aff8cb177c3d82c191c5";

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url, (err, response, body) => {
    if (err) {
      res.render("index", { weather: null, error: "Error, please try again!" });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("index", {
          weather: null,
          error: "City not found!",
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}.`;
        res.render("index", { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(80);
