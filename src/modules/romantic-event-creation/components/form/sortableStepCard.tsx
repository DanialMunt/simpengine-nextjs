import { EventOption } from "@/types/event-schema";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Trash } from "lucide-react";
import { Control, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberSelect } from "@/components/ui/number-select";
import { Button } from "@/components/ui/button";

type FormValues = {
  steps: {
    selectedEventId?: number | null; // you treat it as optional before selection
    optionIds: number[];             // you read/write this
  }[];
};

type Props = {
  id: string;
  index: number;
  remove: (index: number) => void;
  control: Control<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  templateSteps?: { id: number; title: string; options?: EventOption[] }[];
  optionsById: Map<number, EventOption[]>;
};

export default function SortableStepCard({
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
      className="rounded-lg mix-w-full bg-card border p-3 space-y-3"
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
          <div className="grid gap-2 sm:grid-cols-4">
            {selectedOptions.map((opt) => {
              const checked = selectedOptionIds.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  className={`
                        relative cursor-pointer rounded-md overflow-hidden border
                         transition 
                        ${checked
                      ? "border-primary ring-2 ring-primary"
                      : "border-border"
                    }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={(e) => toggleOption(opt.id, e.target.checked)}
                    aria-label={opt.label}
                  />

                  <img
                    alt={opt.label}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/media/${opt.img_id}`}
                    className="h-48 w-full object-cover hover:scale-110 transition-transform duration-300"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0">
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative flex items-end justify-center h-20 p-2">
                      <span className="text-white text-sm font-medium drop-shadow-sm">
                        {opt.label}
                      </span>
                    </div>
                  </div>

                  <span
                    className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-primary opacity-0 peer-checked:opacity-100"
                    aria-hidden
                  />

                  <span
                    className="pointer-events-none absolute inset-0 rounded-md outline-0 peer-focus-visible:ring-2 peer-focus-visible:ring-primary"
                    aria-hidden
                  />
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
