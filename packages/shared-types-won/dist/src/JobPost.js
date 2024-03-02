"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySchema = exports.JobPostSchema = void 0;
var zod_1 = require("zod");
exports.JobPostSchema = zod_1.z.object({
    // _id: z.instanceof(ObjectId),
    title: zod_1.z.string().min(4).trim(),
    description: zod_1.z.string().min(4).trim(),
    // createdAt: z.date().nullable(),
    // updatedAt: z.date().nullable()
});
exports.mySchema = "Hello Shared schema2 22 333";
// module.exports = {
//   JobPostSchema
// }
