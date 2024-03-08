import { z } from "zod";
import { ObjectId } from "mongodb";
import type { WithId} from "mongodb";
const DB_NAME = "wonjobDB";
const job_posts = "job_posts";
export const JobPostSchema = z.object({
  _id: z.string(),
  title: z.string().min(4).trim(),
  description: z.string().min(4).trim(),
  createdAt: z.number() ,
  updatedAt: z.date().nullable(),
});
export type JobPostType = z.infer<typeof JobPostSchema>;
export type JobPostWithId = WithId<JobPostType>;
export const mySchema = "Hello Shared schema test test test 111";
// export const jobPostCollection = collection(job_posts);