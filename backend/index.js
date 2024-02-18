require("dotenv").config();
const Express = require("express");
const app = Express();
const CONNECTION_STRING = process.env.MONGO_ATLAS_URL;
const DB_NAME = "wonjobDB"
const port = process.env.PORT || 5000;
const job_posts = "job_posts"
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);

  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Error connecting to database:", error);
    } else {
      console.log(process.env.NODE_ENV);
      database = client.db(DB_NAME);
      console.log("DB Success  " + "\x1b[0m" + "\x1b[46m" + "➜ " + "\x1b[0m" + " Local:   http://localhost:5038");

      app.get('/api', (req, res) => {
        res.json({
          api_routes: ["/api/job_posts", "/api/job_posts2"],
        });
      });
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
    }
  })
})
app.get('/', (req, res) => {
  res.json({
    message: `Hello Won Job API listening on ${port} , ${CONNECTION_STRING} .`,
  });
});
app.get('/api', (req, res) => {
  res.json({
    api_routes: ["/api/job_posts", "/api/job_posts2"],
  });
});
// app.get('/api/job_posts', (req, res) => {
//   res.json({
//     message: `job_posts from index Hello WonJob Backend API Works ${port}`,
//   });
// });
module.exports = app;