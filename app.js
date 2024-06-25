const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT ?? 3000
const apiKey = process.env.OPEN_WEATHER_MAP_KEY;

const getOpenWeatherMapReq = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
}

//HTML templating engine
app.set("view engine", "pug");
//Set to 'views' by default anyway.
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

//Serve static files in public
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  console.info('Received request for weather at:', city)
  const url = getOpenWeatherMapReq(city);

  try{
    const { body } = await fetch(url);
    const chunks = [];
    for await (const chunk of body){
      chunks.push(chunk);
    }
    const data = JSON.parse(Buffer.concat(chunks));

    if (!data.main) {
      res.render('index', { weather: null, error: 'City not found.'})
    }

    const temp = data.main.temp
    const name = data.name
    console.info('temp', temp)
    console.info('name', name)

    res.render('index', {
      weather: `It's ${temp} degrees in ${name}.`
    })
  } catch(e) {
    console.error(e)
    res.render("index", { weather: null, error: "Error, please try again!" });
  }
});

app.listen(port);
console.info(`Server listening at: http://localhost:${port}`)
