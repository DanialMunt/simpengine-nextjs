import { z } from "zod";


const simpTargetBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});


export const simpTargetSchema = simpTargetBaseSchema.extend({
  id: z.number(),
});

export type SimpTarget = z.infer<typeof simpTargetSchema>;


export const createSimpTargetSchema = simpTargetBaseSchema;
export type CreateSimpTarget = z.infer<typeof createSimpTargetSchema>;


export const updateSimpTargetSchema = simpTargetBaseSchema
  .partial()
  .extend({ id: z.number() });
export type UpdateSimpTarget = z.infer<typeof updateSimpTargetSchema>;
