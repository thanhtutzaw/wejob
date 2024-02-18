require("dotenv").config();
var Express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const { Collection } = require("mongoose");
var cors = require("cors");
const multer = require("multer");
var app = Express();
const corsOptions = {
  // origin: "http://localhost:3000" // frontend URI (ReactJS)
  origin: "https://wonjob.vercel.app" // frontend URI (ReactJS)
}
app.use(Express.json());
app.use(cors());
const CONNECTION_STRING = process.env.MONGO_ATLAS_URL;
const DB_NAME = "wonjobDB";
const job_posts = "job_posts";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(CONNECTION_STRING, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
let URL = ''
if (process.env.NODE_ENV === 'development') {
  URL = 5038
  // Code specific to development environment
  console.log('Running in development mode');
} else if (process.env.NODE_ENV === 'production') {
  // Code specific to production environment
  URL = "https://wonjob-backend.vercel.app"
  console.log('Running in production mode');
}
let database;
// const port = true ? 5038 : "https://wonjob-backend.vercel.app"
// const URL = `http://localhost:5038`
// const URL = `https://wonjob-backend.vercel.app/api`
const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
app.listen(5038, () => {
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello WonJob Backend API Works',
    });
  });
}); 
module.exports = app;