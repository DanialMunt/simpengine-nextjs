"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSimpTargets,
  useUpdateSimpTarget,
} from "@/modules/simp-target/hooks/useSimpTarget";
import { CardSkeleton } from "@/components/ui/loadingComp/cardSkeleton";
import { SimpTargetCard } from "./SimpTargetCard";
import UpdateSheet from "./UpdateSheet";
import { createSimpTargetSchema, CreateSimpTarget } from "@/types/simpTarget";
import { SimpTarget } from "@/types/simpTarget";
import {
  Rows3,
  Grid2X2,
  MessageCircleHeart,
  CalendarSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function SimpTargetPage() {
  const { data: targets, isLoading } = useSimpTargets();
  const updateTarget = useUpdateSimpTarget();

  const [open, setOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<SimpTarget | null>(null);
  const [view, setView] = useState<"table" | "cards">("cards");

  const form = useForm<CreateSimpTarget>({
    resolver: zodResolver(createSimpTargetSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleEdit = (target: SimpTarget) => {
    setSelectedTarget(target);
    form.reset({
      name: target.name,
      description: target.description,
    });
    setOpen(true);
  };

  const onSubmit = (values: CreateSimpTarget) => {
    if (!selectedTarget) return;
    updateTarget.mutate(
      { id: selectedTarget.id, data: values },
      {
        onSuccess: () => {
          setOpen(false), toast.success("Update was successful!");
        },
        onError: (error: unknown) => {
          setOpen(false);
          const message =
            error instanceof Error
              ? error.message
              : typeof error === "string"
                ? error
                : "Something went wrong";
          toast.error(message);
        },
      }
    );
  };

  const avatarEmojis = ["👩🏽‍🔧", "👩🏿‍🎓", "👰🏼‍♀️", "👩🏼‍⚕️", "🧕🏽", "👩🏽‍🍳"];

  function getEmojiAvatar(id: number) {
    return avatarEmojis[id % avatarEmojis.length];
  }

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col gap-3 overflow-auto">
      <div className="flex justify-between items-center">
        <input
          type="text"
          className="input border input-bordered bg-card py-2 px-5 rounded-md"
          placeholder="Search by name..."
        />
        <div className="relative flex border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            onClick={() => setView("cards")}
            className="relative z-10 flex-1"
          >
            <Grid2X2 className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => setView("table")}
            className="relative z-10 flex-1"
          >
            <Rows3 className="w-4 h-4" />
          </Button>

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute top-0 bottom-0 w-1/2 bg-card rounded-lg ${view === "cards" ? "left-0" : "left-1/2"
              }`}
          />
        </div>
      </div>
      <h1>All Targets</h1>
      <AnimatePresence mode="wait">
        {view === "cards" ? (
          <motion.div
            key="card-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {targets && Array.isArray(targets) && targets.length > 0 ? (
              targets?.map((t) => (
                <SimpTargetCard key={t.id} target={t} onEdit={handleEdit} />
              ))
            ) : (
              <p className="text-muted-foreground ">No targets found</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="table-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-lg bg-card border"
          >
            <table className="w-full overflow-auto border-collapse text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="w-2/4 p-3 text-left font-medium">Name</th>
                  <th className="w-2/4 text-left font-medium">Description</th>

                  <th className="w-1/6 p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {targets && Array.isArray(targets) && targets.length > 0 ? (
                  targets?.map((t) => (
                    <tr key={t.id} className="border-t border-muted">
                      <td className="p-3">
                        {getEmojiAvatar(t.id)} {t.name}
                      </td>
                      <td>{t.description}</td>

                      <td className="p-3">
                        <div className="flex justify-start gap-2">
                          <Button size="sm">
                            <MessageCircleHeart />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <CalendarSearch />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-muted-foreground">
                    <td className="p-3">No targets found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      <UpdateSheet
        open={open}
        setOpen={setOpen}
        form={form}
        onSubmit={onSubmit}
        isLoading={updateTarget.isPending}
      />
    </div>
  );
}
