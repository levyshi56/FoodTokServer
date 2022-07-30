import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleMapAPI } from './app';

const app: Express = express();
const port = process.env['PORT']
dotenv.config();

const cors = require('cors');

app.use(cors({
  origin: ['https://foodtok-1.levys1.repl.co']
}));

app.get('/', (req: Request, res: Response) => {
  res.send("hello");
});

app.get('/nearbyrestaurant', (req: Request, res: Response) => {
  if (!req.query.lat || !req.query.long) {
    res.send({ message: 'no lat or no long' });
  }
  let lat = req.query.lat;
  let long = req.query.long;
  let mapsAPI = new GoogleMapAPI();
  let response = async () => {
    await mapsAPI.getNearbyPlaces(lat, long).then(response => {
      if (response) {
        let restaurantName = []
        console.log(response?.data?.results);
        for (const restaurant of response?.data?.results) {
          restaurantName.push(restaurant?.name);
          console.log(restaurant.geometry.location);
        }
        console.log(restaurantName)
        res.send(JSON.stringify(restaurantName));
      }
      else {
        res.send({ message: "failed" })
      }
    });
  }
  response();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
