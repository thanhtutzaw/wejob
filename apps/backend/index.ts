import dotenv from "dotenv";
dotenv.config();
import Express from "express";
import cors from "cors";
// import { mySchema } from "../../packages/index";
import { MongoClient, ObjectId } from "mongodb";
// import { JobPostSchema , mySchema } from "../shared/JobPostSchema";
import { JobPostSchema, type JobPostType } from "@wonjob/shared-types/index";

import { z } from "zod";
const app = Express();
const CONNECTION_STRING = process.env.MONGO_ATLAS_URL ?? "";
const DB_NAME = "wonjobDB";
const port = process.env.PORT || 5000;
const job_posts = "job_posts";
app.use(Express.json());
const corsOptions = {
  origin: [
    "https://wonjob.vercel.app",
    "http://localhost:5173",
    "http://localhost:4173",
  ],
};
app.use(cors(corsOptions));
let client: MongoClient;
client = new MongoClient(CONNECTION_STRING, {
  monitorCommands: true,
});
const jobPostCollection = client.db(DB_NAME).collection(job_posts);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
  console.log("Backend Node Env - " + process.env.NODE_ENV);
  console.log(
    "DB Success  " +
      "\x1b[0m" +
      "\x1b[46m" +
      "➜ " +
      "\x1b[0m" +
      " Local:   http://localhost:5038"
  );
  console.log(
    "DB Success  " +
      "\x1b[0m" +
      "\x1b[46m" +
      "➜ " +
      "\x1b[0m" +
      " job_posts:   http://localhost:5038/api/job_posts"
  );
});
app.get("/", (req, res) => {
  res.json({
    message: `Hello Won Job API listening on ${port} . ${"mySchema"}`,
  });
});
app.get("/api", (req, res) => {
  res.json({
    api_routes: ["/api/job_posts", "/api/job_posts2"],
  });
});

app.get(`/api/${job_posts}`, async (req, res) => {
  try {
    const results = await jobPostCollection
      .find({})
      .limit(50)
      .sort({ createdAt: -1 })
      .toArray();
    res.send(JSON.stringify(results)).status(200);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
});
app.post(`/api/${job_posts}`, async (req, res) => {
  try {
    console.log(
      "Request Body:  " + req.body ? JSON.stringify(req.body) : req.body
    );
    const body = req.body;
    const validData = JobPostSchema.safeParse(body);
    if (!validData.success) {
      res.status(422).send("Invalid Data !");
      throw new Error("Invalid Data !");
    }
    const newData = {
      ...validData,
      createdAt: Date.now(),
      // title: String(req.query.title) ?? "",
    };
    console.log(newData);
    const results = await jobPostCollection.insertOne(newData);
    res
      .json({
        message: "Added List Successfully",
        data: newData,
        results,
      })
      .status(200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(422).send(error.message ?? error);
    }
    res.status(500).send("Internal Server Error" + error);
  }
});
app.put(`/api/${job_posts}`, async (req, res) => {
  try {
    console.log(
      "Request Body:  " + req.body ? JSON.stringify(req.body) : req.body
    );
    const query = { _id: new ObjectId(String(req.query.id)) };
    const body = req.body;
    const { _id, ...newData } = body;
    const results = await jobPostCollection.updateOne(
      query,
      { $set: newData },
      { upsert: true }
    );
    res
      .send(
        "Updated List Successfully : " +
          JSON.stringify(results) +
          JSON.stringify(body)
      )
      .status(200);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
});
app.delete(`/api/${job_posts}`, async (req, res) => {
  try {
    console.log("myreqId " + req.query.id);
    const query = { _id: new ObjectId(String(req.query.id)) };
    const results = await jobPostCollection.deleteOne(query);
    res.send("Deleted Successfully : id - " + req.query.id).status(200);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
});
// app.patch(`/api/${job_posts}/add`, multer().none(), async (req:Request, res:Response) => {
// try {
//   const newData = {
//     id: String(await collection.estimatedDocumentCount() + 1),
//     title: String(req.query.title) ?? "",
//   };
//   const results = await collection.insertOne(newData);
//   res.send("Edited List Successfully : " + results).status(200);
// } catch (error) {
//   res.status(500).send("Internal Server Error" + error);
// }
// });
