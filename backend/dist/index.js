"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
// import { JobPostSchema , mySchema } from "../shared/JobPostSchema";
const zod_1 = require("zod");
const app = (0, express_1.default)();
const CONNECTION_STRING = (_a = process.env.MONGO_ATLAS_URL) !== null && _a !== void 0 ? _a : "";
const DB_NAME = "wonjobDB";
const port = process.env.PORT || 5000;
const job_posts = "job_posts";
app.use(express_1.default.json());
const corsOptions = {
    origin: [
        "https://wonjob.vercel.app",
        "http://localhost:5173",
        "http://localhost:4173",
    ],
};
app.use((0, cors_1.default)(corsOptions));
let client;
client = new mongodb_1.MongoClient(CONNECTION_STRING, {
    monitorCommands: true,
});
const jobPostCollection = client.db(DB_NAME).collection(job_posts);
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
    console.log("Backend Node Env - " + process.env.NODE_ENV);
    console.log("DB Success  " +
        "\x1b[0m" +
        "\x1b[46m" +
        "➜ " +
        "\x1b[0m" +
        " Local:   http://localhost:5038");
    console.log("DB Success  " +
        "\x1b[0m" +
        "\x1b[46m" +
        "➜ " +
        "\x1b[0m" +
        " job_posts:   http://localhost:5038/api/job_posts");
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
app.get(`/api/${job_posts}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield jobPostCollection
            .find({})
            .limit(50)
            .sort({ createdAt: -1 })
            .toArray();
        res.send(JSON.stringify(results)).status(200);
    }
    catch (error) {
        res.status(500).send("Internal Server Error" + error);
    }
}));
app.post(`/api/${job_posts}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Body:  " + req.body ? JSON.stringify(req.body) : req.body);
        const body = req.body;
        // const validData = JobPostSchema.parse(body);
        const validData = body;
        const newData = Object.assign(Object.assign({}, validData), { createdAt: Date.now() });
        console.log(newData);
        const results = yield jobPostCollection.insertOne(newData);
        res
            .json({
            message: "Added List Successfully",
            data: newData,
            results,
        })
            .status(200);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(422).send(error.message);
        }
        res.status(500).send("Internal Server Error" + error);
    }
}));
app.put(`/api/${job_posts}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Body:  " + req.body ? JSON.stringify(req.body) : req.body);
        const query = { _id: new mongodb_1.ObjectId(String(req.query.id)) };
        const body = req.body;
        const { _id } = body, newData = __rest(body, ["_id"]);
        const results = yield jobPostCollection.updateOne(query, { $set: newData }, { upsert: true });
        res
            .send("Updated List Successfully : " +
            JSON.stringify(results) +
            JSON.stringify(body))
            .status(200);
    }
    catch (error) {
        res.status(500).send("Internal Server Error" + error);
    }
}));
app.delete(`/api/${job_posts}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("myreqId " + req.query.id);
        const query = { _id: new mongodb_1.ObjectId(String(req.query.id)) };
        const results = yield jobPostCollection.deleteOne(query);
        res.send("Deleted Successfully : id - " + req.query.id).status(200);
    }
    catch (error) {
        res.status(500).send("Internal Server Error" + error);
    }
}));
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
//# sourceMappingURL=index.js.map