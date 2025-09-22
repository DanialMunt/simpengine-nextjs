"use client"
import { onboardingSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input/input";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/stores/useOnboardingStore";


const onboardingPasswordSchema = onboardingSchema.pick({ 
    password: true,
confirmPassword: true});
type OnboardingPasswordSchema = z.infer<typeof onboardingPasswordSchema>;

export default function OnboardingPasswordForm() {
  const router = useRouter();
  const setData = useOnboardingStore((state) => state.setData);
    const form = useForm<OnboardingPasswordSchema>( {
        resolver: zodResolver(onboardingPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (data: OnboardingPasswordSchema) => {
        setData(data);
        router.push("/onboarding/username");
    }

    return <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>This is your password confirmation.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
    

}