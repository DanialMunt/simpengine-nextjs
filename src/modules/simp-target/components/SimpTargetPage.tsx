"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSimpTargets, useUpdateSimpTarget } from "@/modules/simp-target/hooks/useSimpTarget"
import { CardSkeleton } from "@/components/ui/loading/cardSkeleton"
import { SimpTargetCard } from "./SimpTargetCard"
import UpdateSheet from "./UpdateSheet"
import { createSimpTargetSchema, CreateSimpTarget } from "@/types/simpTarget"

export default function SimpTargetPage() {
  const { data: targets, isLoading } = useSimpTargets()
  const updateTarget = useUpdateSimpTarget()

  const [open, setOpen] = useState(false)
  const [selectedTarget, setSelectedTarget] = useState<any | null>(null)

  const form = useForm<CreateSimpTarget>({
    resolver: zodResolver(createSimpTargetSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const handleEdit = (target: any) => {
    setSelectedTarget(target)
    form.reset({
      name: target.name,
      description: target.description,
    })
    setOpen(true)
  }

  const onSubmit = (values: CreateSimpTarget) => {
    if (!selectedTarget) return
    updateTarget.mutate(
      { id: selectedTarget.id, data: values },
      {
        onSuccess: () => setOpen(false),
      }
    )
  }

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )

  return (
    <div className="flex flex-col gap-3 overflow-auto">
      <input
        type="text"
        className="input mb-2 input-bordered w-full bg-white py-2 px-5 rounded-md max-w-xs"
        placeholder="Search by name..."
      />
      <h1>All Targets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {targets?.map((t) => (
          <SimpTargetCard key={t.id} target={t} onEdit={handleEdit} />
        ))}
      </div>

      <UpdateSheet
        open={open}
        setOpen={setOpen}
        form={form}
        onSubmit={onSubmit}
        isLoading={updateTarget.isPending}
      />
    </div>
  )
}
