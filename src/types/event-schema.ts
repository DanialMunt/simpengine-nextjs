import { id } from "date-fns/locale";
import {z} from "zod";

export const eventOption = z.object({
    id: z.number(),
    label: z.string().min(1).max(20),
    img_id: z.string().min(1).max(100),
})

export const eventStep = z.object({
    title: z.string().min(3).max(20),
    description: z.string().min(3).max(100),
    step_order: z.number().min(1),
    options: z.array(eventOption).min(1),
})

export const templateStep = z.object({
    id: z.number(),
    title: z.string().min(1).max(20),
    description: z.string().min(1).max(100),
    options: z.array(eventOption).min(1).optional(),
})


export const romanticEvent = z.object({
    id: z.number().optional(),
    title: z.string().min(3).max(30),
    description: z.string().min(3).max(100),
    //event_date: z.date(),
    event_date: z.string().min(3).max(30),
    simp_target_id: z.number().min(1) ,
    steps: z.array(eventStep).min(1),
    status: z.string().min(3).max(20)
});

export type RomanticEvent = z.infer<typeof romanticEvent>;
export type TemplateStep = z.infer<typeof templateStep>;
export type EventOption = z.infer<typeof eventOption>;

export const eventOptionCreate = z.object({
  label: z.string().min(1).max(20),
  img_id: z.string().min(1).max(100),
});

export const eventStepCreate = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(3).max(100),
  step_order: z.number().min(0), // or min(1) if you want 1-based
  options: z.array(eventOptionCreate).min(1),
});

export const createStepsPayload = z.object({
  steps: z.array(eventStepCreate).min(1),
});

export type CreateStepsPayload = z.infer<typeof createStepsPayload>;
