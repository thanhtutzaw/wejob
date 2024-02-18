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
app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Error connecting to database:", error);
    } else {

      console.log(process.env.NODE_ENV);

      database = client.db(DB_NAME);
      console.log("DB Success  " + "\x1b[0m" + "\x1b[46m" + "➜ " + "\x1b[0m" + " Local:   http://localhost:5038");
      app.get(`/api/${job_posts}`, async (req, res) => {
        let collection = await database.collection(job_posts);
        try {
          let results = await collection.find({}).limit(50).toArray();
          res.send(results).status(200);
        } catch (error) {
          res.status(500).send('Internal Server Error' + error);
        }
      });
      app.post(`/api/${job_posts}`, async (req, res) => {
        let collection = await database.collection(job_posts);
        console.log("Request Body:  " + req.body ? JSON.stringify(req.body) : req.body)
        const body = req.body
        const newData = {
          title: String(req.query.title) ?? "",
          ...body
        };
        let results = await collection.insertOne(newData);
        res.send("Added List Successfully : " + results).status(200);
      });
      app.delete(`/api/${job_posts}`, async (req, res) => {
        console.log("myreqId " + req.query.id);
        let collection = await database.collection(job_posts);
        const query = { _id: ObjectId(req.query.id) };
        let results = await collection.deleteOne(query);
        res.send("Deleted Successfully : id - " + req.query.id).status(200);
      });
      // app.patch(`/api/${job_posts}/add`, multer().none(), async (req, res) => {
      //   let collection = await db.collection(job_posts);
      //   const newData = {
      //     id: String(await collection.estimatedDocumentCount() + 1),
      //     title: String(req.query.title) ?? "",
      //   };
      //   let results = await collection.insertOne(newData);
      //   res.send("Edited List Successfully : " + results).status(200);
      // });
      // async function run() {
      //     try {
      //         // Connect the client to the server	(optional starting in v4.7)
      //         await client.connect();
      //         // Send a ping to confirm a successful connection
      //         await client.db("admin").command({ ping: 1 });
      //         console.log("Pinged your deployment. You successfully connected to MongoDB!");
      //     } finally {
      //         // Ensures that the client will close when you finish/error
      //         await client.close();
      //     }
      // }
      // run().catch(console.dir);
    }
  });
});