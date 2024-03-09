var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
var import_dotenv = __toESM(require("dotenv"), 1);
var import_express = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_mongodb = require("mongodb");

// ../../packages/shared-types-won/src/JobPost.ts
var import_zod = require("zod");
var JobPostSchema = import_zod.z.object({
  _id: import_zod.z.string(),
  title: import_zod.z.string().min(4).trim(),
  description: import_zod.z.string().min(4).trim(),
  createdAt: import_zod.z.number(),
  updatedAt: import_zod.z.date().nullable()
});
var mySchema = "Hello Shared schema test test test 111";

// index.ts
var import_zod2 = require("zod");
import_dotenv.default.config();
var app = (0, import_express.default)();
var _a;
var CONNECTION_STRING = (_a = process.env.MONGO_ATLAS_URL) != null ? _a : "";
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
var db = client.db(DB_NAME);
var jobPostCollection = db.collection(job_posts);
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
    message: `Won Job API listening on ${port}.`,
    sharedSchema: JobPostSchema,
    testSchema: mySchema
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
  var _a2;
  try {
    console.log(
      "Request Body:  " + req.body ? JSON.stringify(req.body) : req.body
    );
    const body = req.body;
    const validData = JobPostSchema.safeParse(body);
    if (!validData.success) {
      res.status(422).send("Invalid Data !");
      return;
    }
    const newData = __spreadProps(__spreadValues({}, validData.data), {
      createdAt: Date.now(),
      _id: new import_mongodb.ObjectId(validData.data._id)
      // title: String(req.query.title) ?? "",
    });
    console.log(newData);
    const results = await jobPostCollection.insertOne(newData);
    res.json({
      message: "Added List Successfully",
      data: newData,
      results
    }).status(200);
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
      res.status(422).send((_a2 = error.message) != null ? _a2 : error);
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
    const _a2 = body, { _id } = _a2, newData = __objRest(_a2, ["_id"]);
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
