import { z } from "zod";
export const JobPostSchema = z.object({
  // _id: z.instanceof(ObjectId),
  title: z.string().min(4).trim(),
  description: z.string().min(4).trim(),
  // createdAt: z.date().nullable(),
  // updatedAt: z.date().nullable()
});
export const mySchema = "Hello Schema"
// module.exports = {
//   JobPostSchema
// }
