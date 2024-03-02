import { z } from "zod";
export declare const JobPostSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export type JobPostType = z.infer<typeof JobPostSchema>;
export declare const mySchema = "Hello Shared schema2 22 333";
//# sourceMappingURL=JobPost.d.ts.map