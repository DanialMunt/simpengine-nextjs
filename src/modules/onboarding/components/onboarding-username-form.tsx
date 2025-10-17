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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

const onboardingUsernameSchema = onboardingSchema.pick({ 
    username: true,
    terms: true

});
type OnboardingUsernameSchema = z.infer<typeof onboardingUsernameSchema>;

export default function OnboardingUsernameForm() {
  const firstName = useOnboardingStore((state) => state.firstName);
  const lastName = useOnboardingStore((state) => state.lastName);
  const password = useOnboardingStore((state) => state.password);
  const confirmPassword = useOnboardingStore((state) => state.confirmPassword);
  const terms = useOnboardingStore((state) => state.terms);


    const form = useForm<OnboardingUsernameSchema>( {
        resolver: zodResolver(onboardingUsernameSchema),
        defaultValues: {
            username: "",
            terms: false,
        },
    })

    const onSubmit = (data: OnboardingUsernameSchema) => {
        console.log({
          ...data,
          firstName
          , lastName, password, confirmPassword, 
        });
     
    }

    return <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
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
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
    

}