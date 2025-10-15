import { z } from "zod";

const simpTargetBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});


export const simpTargetSchema = simpTargetBaseSchema.extend({
  id: z.number(),
});

export const createSimpTargetSchema = simpTargetBaseSchema;

export type SimpTarget = z.infer<typeof simpTargetSchema>;

export type CreateSimpTarget = z.infer<typeof createSimpTargetSchema>;

export type UpdateSimpTarget = Partial<Omit<SimpTarget, "id">>


