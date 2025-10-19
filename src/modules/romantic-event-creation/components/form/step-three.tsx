"use client";
import { eventStep, eventOption, romanticEvent } from "@/types/event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRomanticEventStore } from "@/stores/useRomanticEventStore";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberSelect } from "@/components/ui/number-select";
import { useGetTemplateSteps } from "../../hooks/useRomanticEventCreation";
import { EventOption } from "@/types/event-schema";

type EventBlock = {
  selectedEventId?: number;
  optionIds: number[];
};

type FormValues = {
  blocks: EventBlock[];
};

export default function StepThree() {
  const { data: templateSteps, isLoading } = useGetTemplateSteps();

  const router = useRouter();

  const methods = useForm<FormValues>({
    defaultValues: {
      blocks: [{ selectedEventId: undefined }],
    },
  });

  const { control, handleSubmit, watch, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "blocks",
  });

  const onSubmit = (values: FormValues) => {
    
   
    console.log("SUBMIT JSON:", JSON.stringify(values, null, 2));
  };
  //

  const optionsById = useMemo(() => {
    const map = new Map<number, EventOption[]>();
    templateSteps?.forEach((ts) => map.set(ts.id, ts.options ?? []));
    return map;
  }, [templateSteps]);

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar with Add button */}
      <div className="flex items-center justify-between w-[40vw]">
        <h2 className="text-lg font-semibold">Events</h2>
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ selectedEventId: undefined, optionIds: [] })}
        >
          + Add another event
        </Button>
      </div>

      <Form {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[40vw] p-3 rounded-lg space-y-6"
        >
          {/* Repeatable blocks */}
          <div className="space-y-4">
            {fields.map((f, index) => {
              const selectedId = watch(`blocks.${index}.selectedEventId`);
              const selectedOptions = selectedId
                ? optionsById.get(selectedId) ?? []
                : [];
              const selectedOptionIds =
                watch(`blocks.${index}.optionIds`) ?? [];
              const toggleOption = (optId: number, checked: boolean) => {
                const current = new Set<number>(selectedOptionIds);
                if (checked) current.add(optId);
                else current.delete(optId);
                setValue(`blocks.${index}.optionIds`, Array.from(current), {
                  shouldDirty: true,
                });
              };
              return (
                <div
                  key={f.id}
                  className="rounded-lg bg-card border p-3 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <FormField
                      control={control}
                      name={`blocks.${index}.selectedEventId`}
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <NumberSelect
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an event" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {templateSteps?.map((ts) => (
                                <SelectItem key={ts.id} value={String(ts.id)}>
                                  {ts.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </NumberSelect>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Options for selected event only */}
                  {selectedId ? (
                    selectedOptions.length > 0 ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {selectedOptions.map((opt) => {
                          const checked = selectedOptionIds.includes(opt.id);
                          return (
                            <label
                              key={opt.id}
                              className="flex items-center gap-2 rounded-md border p-2 cursor-pointer hover:bg-muted/60"
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(val) =>
                                  toggleOption(opt.id, Boolean(val))
                                }
                              />
                              <span className="text-sm">{opt.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No options for this event.
                      </p>
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Select an event to choose options.
                    </p>
                  )}

                  {selectedOptionIds.length > 0 && (
                    <div className="pt-1">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-xs"
                        onClick={() =>
                          setValue(`blocks.${index}.optionIds`, [], {
                            shouldDirty: true,
                          })
                        }
                      >
                        Clear selections
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom controls (Submit does nothing for now; purely UI) */}
          <div className="flex items-center gap-3">
            <Button type="submit">Create a romantic event</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
