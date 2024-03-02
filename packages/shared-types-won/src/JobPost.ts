import { z } from "zod";
export const JobPostSchema = z.object({
  // _id: z.instanceof(ObjectId),
  title: z.string().min(4).trim(),
  description: z.string().min(4).trim(),
  // createdAt: z.date().nullable(),
  // updatedAt: z.date().nullable()
});
export type JobPostType = z.infer<typeof JobPostSchema>;
export const mySchema = "Hello Shared schema2 22 333";
// module.exports = {
//   JobPostSchema
// }
