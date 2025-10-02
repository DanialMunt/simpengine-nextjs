"use client";
import { eventStep, eventOption, romanticEvent } from "@/types/event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { useRouter } from "next/navigation";
import { useSimpTargets } from "@/modules/simp-target/hooks/useSimpTarget";
import { useRomanticEventStore } from "@/stores/useRomanticEventStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { NumberSelect } from "@/components/ui/number-select";

const stepTwoChema = romanticEvent.pick({ title: true ,
    description: true, event_date: true
});

type StepTwoSchema = z.infer<typeof stepTwoChema>;

export default function StepTwo() {
  const { data: targets, isLoading } = useSimpTargets();

  const router = useRouter();

  const setData = useRomanticEventStore((state) => state.setData);

  const form = useForm<StepTwoSchema>({
    resolver: zodResolver(stepTwoChema),
    defaultValues: {
      title: "",
      description: "",
      event_date: ""
    },
  });

  const onSubmit = (data: StepTwoSchema) => {
    console.log("data of step two", data);
    setData(data);
    router.push("/romantic-event/step-three");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="First romantical date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Our first romantical event, special moment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        

        <Button type="submit">Next Fucking Go</Button>
      </form>
    </Form>
  );
}
