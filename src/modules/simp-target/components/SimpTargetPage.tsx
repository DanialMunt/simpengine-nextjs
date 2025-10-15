"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSimpTargets,
  useUpdateSimpTarget,
} from "@/modules/simp-target/hooks/useSimpTarget";
import { CardSkeleton } from "@/components/ui/loading/cardSkeleton";
import { SimpTargetCard } from "./SimpTargetCard";
import UpdateSheet from "./UpdateSheet";
import { createSimpTargetSchema, CreateSimpTarget } from "@/types/simpTarget";
import { Rows3, Grid2X2 } from "lucide-react";
import { th } from "date-fns/locale";
export default function SimpTargetPage() {
  const { data: targets, isLoading } = useSimpTargets();
  const updateTarget = useUpdateSimpTarget();

  const [open, setOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<any | null>(null);
  const [tabs, setTabs] = useState(0);

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
        onSuccess: () => setOpen(false),
      }
    );
  };

  const avatarEmojis = ["👩🏽‍🔧", "👩🏿‍🎓", "👰🏼‍♀️", "👩🏼‍⚕️", "🧕🏽", "👩🏽‍🍳"];

  function getEmojiAvatar(id: number) {
    const hash = (id * 2654435761) % 3 ** 32;
    return avatarEmojis[hash % avatarEmojis.length];
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
        <div className="flex border rounded-lg gap-1">
          <div
            onClick={() => setTabs(0)}
            className={`${tabs === 0 ? "bg-card" : "bg-none"} rounded-lg p-3 `}
          >
            <Rows3 />
          </div>
          <div
            onClick={() => setTabs(1)}
            className={`${tabs === 0 ? "bg-none" : "bg-card"} rounded-lg p-3 `}
          >
            <Grid2X2 />
          </div>
        </div>
      </div>
      <h1>All Targets</h1>
      {tabs === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {targets?.map((t) => (
            <SimpTargetCard key={t.id} target={t} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <table className="border p-3 bg-card w-full border-collapse rounded-lg ">
          <thead className="">
            <tr className=" ">
              <th className="border p-3 w-5">Emoji</th>
              <th className="border p-3">Name</th>
              <th className="border">Description</th>
              <th className="border">Status</th>
              <th className="border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {targets?.map((t) => (
              <tr key={t.id}>
                <td className="p-3 border text-2xl">{getEmojiAvatar(t.id)}</td>
                <td className="p-3 border">{t.name}</td>
                <td className="p-3 border">{t.description}</td>
                <td className="p-3 border">{t.description}</td>
                <td className="p-3 border">{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
