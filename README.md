# Source for EdiWeather.co.uk

Originally built using this [tutorial](https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b)
It has since been updated by myself:

- Switched to Pug from EJS for fun.
- Try out Node's experimental `.env` file support instead of using `dotenv` dep.

## Overview

Site is a static HTML webpage served via a HTML templating engine (currently Pug aka Jade) from a ExpressJS web server.

## Setup

- `npm install`.
- Create `.env` file based on `.env.defaults` (You will need an Open Weather Map API key).
- `npm run start`.


