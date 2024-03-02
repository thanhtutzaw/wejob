var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// index.ts
var import_dotenv = __toESM(require("dotenv"));
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_mongodb = require("mongodb");

// ../../packages/shared-types-won/src/JobPost.ts
var import_zod = require("zod");
var JobPostSchema = import_zod.z.object({
  // _id: z.instanceof(ObjectId),
  title: import_zod.z.string().min(4).trim(),
  description: import_zod.z.string().min(4).trim()
  // createdAt: z.date().nullable(),
  // updatedAt: z.date().nullable()
});

// index.ts
var import_zod2 = require("zod");
import_dotenv.default.config();
var app = (0, import_express.default)();
var CONNECTION_STRING = process.env.MONGO_ATLAS_URL ?? "";
var DB_NAME = "wonjobDB";
var port = process.env.PORT || 5e3;
var job_posts = "job_posts";
app.use(import_express.default.json());
var corsOptions = {
  origin: [
    "https://wonjob.vercel.app",
    "http://localhost:5173",
    "http://localhost:4173"
  ]
};
app.use((0, import_cors.default)(corsOptions));
var client;
client = new import_mongodb.MongoClient(CONNECTION_STRING, {
  monitorCommands: true
});
var jobPostCollection = client.db(DB_NAME).collection(job_posts);
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
  console.log("Backend Node Env - " + process.env.NODE_ENV);
  console.log(
    "DB Success  \x1B[0m\x1B[46m\u279C \x1B[0m Local:   http://localhost:5038"
  );
  console.log(
    "DB Success  \x1B[0m\x1B[46m\u279C \x1B[0m job_posts:   http://localhost:5038/api/job_posts"
  );
});
app.get("/", (req, res) => {
  res.json({
    message: `Hello Won Job API listening on ${port} . ${"mySchema"}`
  });
});
app.get("/api", (req, res) => {
  res.json({
    api_routes: ["/api/job_posts", "/api/job_posts2"]
  });
});
app.get(`/api/${job_posts}`, async (req, res) => {
  try {
    const results = await jobPostCollection.find({}).limit(50).sort({ createdAt: -1 }).toArray();
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
      createdAt: Date.now()
      // title: String(req.query.title) ?? "",
    };
    console.log(newData);
    const results = await jobPostCollection.insertOne(newData);
    res.json({
      message: "Added List Successfully",
      data: newData,
      results
    }).status(200);
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
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
    const query = { _id: new import_mongodb.ObjectId(String(req.query.id)) };
    const body = req.body;
    const { _id, ...newData } = body;
    const results = await jobPostCollection.updateOne(
      query,
      { $set: newData },
      { upsert: true }
    );
    res.send(
      "Updated List Successfully : " + JSON.stringify(results) + JSON.stringify(body)
    ).status(200);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
});
app.delete(`/api/${job_posts}`, async (req, res) => {
  try {
    console.log("myreqId " + req.query.id);
    const query = { _id: new import_mongodb.ObjectId(String(req.query.id)) };
    const results = await jobPostCollection.deleteOne(query);
    res.send("Deleted Successfully : id - " + req.query.id).status(200);
  } catch (error) {
    res.status(500).send("Internal Server Error" + error);
  }
});
