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
  const [selectedTarget, setSelectedTarget] = useState<any | null>(null);
  const [view, setView] = useState<"table" | "cards">("cards");

  const form = useForm<CreateSimpTarget>({
    resolver: zodResolver(createSimpTargetSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleEdit = (target: any) => {
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
          setOpen(false), toast.success("Success!",
            {description: "Update was successful"}
          );
        },
         onError: (error) => {
          setOpen(false), toast.error((error as any)?.message);
         }
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
          className="input border input-bordered w-full bg-card py-2 px-5 rounded-md max-w-xs"
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
            className={`absolute top-0 bottom-0 w-1/2 bg-card rounded-lg ${
              view === "cards" ? "left-0" : "left-1/2"
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
            {targets?.map((t) => (
              <SimpTargetCard key={t.id} target={t} onEdit={handleEdit} />
            ))}
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
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="text-left font-medium">Description</th>
                  <th className="text-left font-medium">Status</th>
                  <th className="text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {targets?.map((t) => (
                  <tr key={t.id} className="border-t border-muted">
                    <td className="p-3">
                      {getEmojiAvatar(t.id)} {t.name}
                    </td>
                    <td>{t.description}</td>
                    <td>
                      <span className="py-1 px-3 bg-amber-400 rounded-lg text-white text-xs">
                        Active
                      </span>
                    </td>
                    <td className="flex gap-2 py-2">
                      <Button size="sm">
                        <MessageCircleHeart />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <CalendarSearch />
                      </Button>
                    </td>
                  </tr>
                ))}
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
