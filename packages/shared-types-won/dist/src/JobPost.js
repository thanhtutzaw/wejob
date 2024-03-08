"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySchema = exports.JobPostSchema = void 0;
var zod_1 = require("zod");
var DB_NAME = "wonjobDB";
var job_posts = "job_posts";
exports.JobPostSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    title: zod_1.z.string().min(4).trim(),
    description: zod_1.z.string().min(4).trim(),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.date().nullable(),
});
exports.mySchema = "Hello Shared schema test test test 111";
// export const jobPostCollection = collection(job_posts);
