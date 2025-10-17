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
import { useSimpTargets } from "@/modules/simp-target/hooks/useSimpTarget";
import { useRomanticEventStore } from "@/stores/useRomanticEventStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { NumberSelect } from "@/components/ui/number-select";

const stepOneChema = romanticEvent.pick({ simp_target_id: true });

type StepOneSchema = z.infer<typeof stepOneChema>;

export default function StepOne() {
  const { data: targets, isLoading } = useSimpTargets();

  const router = useRouter();

  const setData = useRomanticEventStore((state) => state.setData);

  const form = useForm<StepOneSchema>({
    resolver: zodResolver(stepOneChema),
    defaultValues: {
      simp_target_id: undefined,
    },
  });

  const onSubmit = (data: StepOneSchema) => {
    console.log("data", data);
    const id = Number(data.simp_target_id);
    setData({
      ...data,
      simp_target_id: id, 
    });
    router.push("/romantic-event-creation/step-two");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card p-5 min-w-sm lg:min-w-md border rounded-lg space-y-8"
      >
        <FormField
       
          control={form.control}
          name="simp_target_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
             
              <NumberSelect onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a target" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {targets?.map((target) => (
                    <SelectItem key={target.id} value={String(target.id)}>
                      {target.name} 
                    </SelectItem>
                  ))}
                </SelectContent>
                </NumberSelect>
              {/* </Select> */}
              <FormMessage />
            </FormItem>
          )}
        />

       <div className="flex justify-between">
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>

          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  );
}
