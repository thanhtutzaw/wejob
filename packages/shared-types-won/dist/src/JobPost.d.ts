import { z } from "zod";
import type { WithId } from "mongodb";
export declare const JobPostSchema: z.ZodObject<{
    _id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    _id: string;
    title: string;
    description: string;
    createdAt: number;
    updatedAt: Date | null;
}, {
    _id: string;
    title: string;
    description: string;
    createdAt: number;
    updatedAt: Date | null;
}>;
export type JobPostType = z.infer<typeof JobPostSchema>;
export type JobPostWithId = WithId<JobPostType>;
export declare const mySchema = "Hello Shared schema test test test 111";
//# sourceMappingURL=JobPost.d.ts.map