import {z} from "zod";

export const eventStep = z.object({
    title: z.string().min(3).max(20),
    description: z.string().min(3).max(100),
    step_order: z.number().min(1),
})

export const eventOption = z.object({
    label: z.string().min(1).max(20),
    img_id: z.string().min(1).max(100),
})

export const romanticEvent = z.object({
    title: z.string().min(3).max(20),
    description: z.string().min(3).max(100),
    event_date: z.string().min(3).max(20),
    simp_target_id: z.number().min(1),
    steps: z.array(eventStep).min(1),
    
});

export type RomanticEvent = z.infer<typeof romanticEvent>;