"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { CardSkeleton } from "@/components/ui/loading/cardSkeleton"
import { useSimpTargets , useUpdateSimpTarget} from "@/modules/simp-target/hooks/useSimpTarget"
import { SimpTargetCard } from "./SimpTargetCard"


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSimpTargetSchema } from "@/types/simpTarget"
import { CreateSimpTarget } from "@/types/simpTarget"
// const targetSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
// })

// type TargetFormValues = z.infer<typeof targetSchema>



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
        onSuccess: () => {
          setOpen(false) 
        },
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
       {/* <h1>Search</h1>
      <input type="text" className="input mb-3 input-bordered w-full bg-white py-2 px-5 rounded-md max-w-xs" placeholder="Search by name..." />
      <h1>All Targets</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {targets?.map((t) => (
          <SimpTargetCard key={t.id} target={t} onEdit={handleEdit} />
        ))}
      </div>


      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Target</SheetTitle>
            <SheetDescription>
              Update your target details below.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 px-4 py-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <SheetFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
