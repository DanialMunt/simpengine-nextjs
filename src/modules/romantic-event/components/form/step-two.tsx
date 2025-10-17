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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRomanticEventStore } from "@/stores/useRomanticEventStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useCreateRomanticEvent } from "../../hooks/useRomanticEvent";

const stepTwoChema = romanticEvent.pick({
  title: true,
  description: true,
  event_date: true,
});

type StepTwoSchema = z.infer<typeof stepTwoChema>;

export default function StepTwo() {
  const createEvent = useCreateRomanticEvent();
  const router = useRouter();

  const simp_target_id = useRomanticEventStore((state) => state.simp_target_id);

  const setData = useRomanticEventStore((state) => state.setData);

  const form = useForm<StepTwoSchema>({
    resolver: zodResolver(stepTwoChema),
    defaultValues: {
      title: "",
      description: "",
      event_date: "",
    },
  });

  const onSubmit = (data: StepTwoSchema) => {
    createEvent.mutate(
      { ...data, simp_target_id },
      {
        onSuccess: (data) => {
          console.log("Created event", { ...data, simp_target_id });
          router.push("/romantic-event");
        },
        onError: (error) => {
          console.error("Error creating event", error);
        },
      }
    );
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
                <Input
                  placeholder="Our first romantical event, special moment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP") // convert string → Date
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined} // string → Date
                    onSelect={(date) => {
                      field.onChange(date?.toISOString()); // Date → string
                    }}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Next Fucking Go</Button>
      </form>
    </Form>
  );
}
