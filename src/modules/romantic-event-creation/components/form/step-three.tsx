"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import { useMemo } from "react";
import { GripHorizontal, Trash } from "lucide-react";
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
import { CSS } from "@dnd-kit/utilities";
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
function SortableStepCard({
  id,
  index,
  remove,
  control,
  watch,
  setValue,
  templateSteps,
  optionsById,
}: {
  id: string; // field.id from useFieldArray
  index: number;
  remove: (index: number) => void;
  control: any;
  watch: any;
  setValue: any;
  templateSteps:
    | { id: number; title: string; options?: EventOption[] }[]
    | undefined;
  optionsById: Map<number, EventOption[]>;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
    // boxShadow: isDragging ? "0 8px 24px rgba(0,0,0,0.16)" : undefined,
  };

  const selectedId = watch(`steps.${index}.selectedEventId`);
  const selectedOptions = selectedId ? optionsById.get(selectedId) ?? [] : [];
  const selectedOptionIds: number[] = watch(`steps.${index}.optionIds`) ?? [];

  const toggleOption = (optId: number, checked: boolean) => {
    const current = new Set<number>(selectedOptionIds);
    if (checked) current.add(optId);
    else current.delete(optId);
    setValue(`steps.${index}.optionIds`, Array.from(current), {
      shouldDirty: true,
    });
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg bg-card border p-3 space-y-3"
    >
      <div className="flex justify-between items-center gap-3">
        <FormField
          control={control}
          name={`steps.${index}.selectedEventId`}
          render={({ field }) => (
            <FormItem className="w-1/2">
              <NumberSelect
                onValueChange={(val) => {
                  // Ensure number; NumberSelect usually passes number already, but guard just in case
                  const n =
                    typeof val === "string"
                      ? Number(val)
                      : (val as number | undefined);

                  if (n !== selectedId) {
                    setValue(`steps.${index}.optionIds`, [], {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }

                  field.onChange(n);
                }}
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

        {/* Drag handle: grab anywhere on the left edge (you can also add a handle icon) */}
        <button
          type="button"
          aria-label="Drag handle"
          className="cursor-grab active:cursor-grabbing select-none px-2 py-1 rounded border text-xs text-muted-foreground"
          {...attributes}
          {...listeners}
        >
          {" "}
          <GripHorizontal size={16} />
        </button>
      </div>

      {/* Options */}
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
          Select step to choose options.
        </p>
      )}

      <div className="flex justify-end">
        {selectedOptionIds.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            className="text-xs"
            onClick={() =>
              setValue(`steps.${index}.optionIds`, [], { shouldDirty: true })
            }
          >
            Clear selections
          </Button>
        )}
        <Button type="button" variant="ghost" onClick={() => remove(index)}>
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
}

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
    <div className="flex flex-col gap-4">
      {/* Top bar with Add button */}
      <div className="flex items-center justify-between w-[40vw]">
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
          className="w-[40vw] rounded-lg space-y-6"
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
