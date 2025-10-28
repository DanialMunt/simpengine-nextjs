"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SortableStepCard from "./sortableStepCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useGetTemplateSteps } from "../../hooks/useRomanticEventCreation";
import { EventOption } from "@/types/event-schema";
import { useMemo } from "react";
import { useCreateRomanticEventStep } from "../../hooks/useRomanticEventCreation";
// dnd-kit
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { useRomanticEventStore } from "@/stores/useRomanticEventStore";
import { useRouter } from "next/navigation";
import { TemplateStep, CreateStepsPayload } from "@/types/event-schema";

type EventBlock = {
  selectedEventId?: number;
  optionIds: number[];
  description?: string;
};
type FormValues = {
  steps: EventBlock[];
};

// A single sortable card (one “step”)


const buildPayload = (
  values: FormValues,
  templateSteps: TemplateStep[] | undefined,
  optionsById: Map<number, EventOption[]>
): CreateStepsPayload => {
  const stepById = new Map((templateSteps ?? []).map((t) => [t.id, t] as const));

  return {
    steps: values.steps
      .map((s, idx) => {
        if (!s.selectedEventId) return null;

        const meta = stepById.get(s.selectedEventId);
        const optionMeta = optionsById.get(s.selectedEventId) ?? [];
        const optionById = new Map(optionMeta.map((o) => [o.id, o] as const));

        const options = (s.optionIds ?? [])
          .map((oid) => optionById.get(oid))
          .filter((o): o is EventOption => Boolean(o))
          .map((o) => ({
            img_id: o.img_id,  // string
            label: o.label,
          }));

        return {
          title: meta?.title ?? `event_${s.selectedEventId}`,
          description: s.description ?? meta?.description ?? "",
          options,
          step_order: idx + 1, // 0-based
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null),
  };
};

export default function StepThree() {
  const router = useRouter();
  const eventId = useRomanticEventStore((s) => s.id);
  const createStep = useCreateRomanticEventStep();
  const { data: templateSteps } = useGetTemplateSteps();

  const methods = useForm<FormValues>({
    defaultValues: {
      steps: [{ selectedEventId: undefined, optionIds: [] }],
    },
  });

  const { control, handleSubmit, watch, setValue } = methods;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "steps",
  });

  const optionsById = useMemo(() => {
    const map = new Map<number, EventOption[]>();
    templateSteps?.forEach((ts) => map.set(ts.id, ts.options ?? []));
    return map;
  }, [templateSteps]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const onSubmit = (values: FormValues) => {
    const payload = buildPayload(values, templateSteps, optionsById);

    createStep.mutate(
      { romanticEventId: eventId!, data: payload },
      {
        onSuccess: (data) => {
          router.push("/romantic-event");
          console.log("Successfully created steps:", data);
   
        },
        onError: (error) => {
          console.error("Error creating steps:", error);
        },
      }
    );
  };

  // Map field ids for SortableContext
  const sortableIds = fields.map((f) => f.id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortableIds.indexOf(active.id as string);
    const newIndex = sortableIds.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    // Keep RHF array in sync
    move(oldIndex, newIndex);
  };

  return (
    <div className="flex flex-col gap-4 w-[60vw]">
      {/* Top bar with Add button */}
      <div className="flex items-center justify-between ">
        <h2 className="text-lg font-semibold">Events</h2>
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ selectedEventId: undefined, optionIds: [] })}
        >
          + Add another step
        </Button>
      </div>

      <Form {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end rounded-lg space-y-6"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={sortableIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {fields.map((f, index) => (
                  <SortableStepCard
                    key={f.id}
                    id={f.id}
                    index={index}
                    remove={remove}
                    control={control}
                    watch={watch}
                    setValue={setValue}
                    templateSteps={templateSteps}
                    optionsById={optionsById}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="flex items-center gap-3">
            <Button type="submit">Create a romantic event</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
