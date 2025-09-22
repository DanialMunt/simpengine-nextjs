import {z} from "zod";

export const onboardingSchema = z.object({
    username: z.string().min(3).max(20),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    terms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions" }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;