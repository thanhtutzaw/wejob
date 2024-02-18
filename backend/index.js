require("dotenv").config();
const Express = require("express");
const cors = require("cors");
import { MongoClient } from "mongodb";
const app = Express();
const CONNECTION_STRING = process.env.MONGO_ATLAS_URL ?? "";
const DB_NAME = "wonjobDB";
const port = process.env.PORT || 5000;
const job_posts = "job_posts";
// let database;
app.use(Express.json());
const corsOptions = {
  origin: "https://wonjob.vercel.app",
};
app.use(cors(corsOptions));
let client
// const dbo = require("./db/conn");
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });
// let job_posts_collection = client?.db(DB_NAME).collection(job_posts);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
  client.on("commandStarted", (started) => console.log(started));
  client = new MongoClient(CONNECTION_STRING, {
    monitorCommands: true,
  });
  // console.error("Error connecting to database:", error);
  console.log(process.env.NODE_ENV);
  // database = client?.db(DB_NAME);
  console.log(
    "DB Success  " +
    "\x1b[0m" +
    "\x1b[46m" +
    "➜ " +
    "\x1b[0m" +
    " Local:   http://localhost:5038"
  );

  // app.post(`/api/${job_posts}`, async (req, res) => {
  //   let collection = job_posts_collection;
  //   console.log(
  //     "Request Body:  " + req.body ? JSON.stringify(req.body) : req.body
  //   );
  //   const body = req.body;
  //   const newData = {
  //     title: String(req.query.title) ?? "",
  //     ...body,
  //   };
  //   let results = await collection.insertOne(newData);
  //   res.send("Added List Successfully : " + results).status(200);
  // });
});
app.get("/", (req, res) => {
  res.json({
    message: `Hello Won Job API listening on ${port} , ${CONNECTION_STRING} .`,
  });
});
app.get("/api", (req, res) => {
  res.json({
    api_routes: ["/api/job_posts", "/api/job_posts2"],
  });
});
app.get(`/api/${job_posts}`, async (req, res) => {
  let collection = client.db(DB_NAME).collection(job_posts);
  res.send(collection);
  // try {
  //   let results = await collection.find({}).limit(50).toArray();
  //   res.send(results).status(200);
  // } catch (error) {
  //   res.status(500).send("Internal Server Error" + error);
  // }
});
// app.get('/api/job_posts', (req, res) => {
//   res.json({
//     message: `job_posts from index Hello WonJob Backend API Works ${port}`,
//   });
// });
export default app;
