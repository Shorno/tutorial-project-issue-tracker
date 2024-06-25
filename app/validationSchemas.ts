import {z} from "zod";

export const issueSchema = z.object({
    title: z.string().min(5, "Title is required").max(255),
    description: z.string().min(10, "Description is required"),
})