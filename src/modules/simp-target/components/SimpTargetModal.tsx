// components/ui/global-modal.tsx
"use client";
import { useEffect } from "react";
import { useModalStore } from "@/stores/useModalStore";
import { useCreateSimpTarget } from "../hooks/useSimpTarget";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSimpTargetSchema, CreateSimpTarget } from "@/types/simpTarget";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
export default function SimpTargetModal() {
  const { isOpen, close } = useModalStore();
  const createTarget = useCreateSimpTarget();

  const form = useForm<CreateSimpTarget>({
    resolver: zodResolver(createSimpTargetSchema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({ name: "", description: "" });
    }
  }, [form.formState, form.reset]);

  const onSubmit = (values: CreateSimpTarget) => {
    createTarget.mutate(
      { name: values.name, description: values.description },
      {
        onSuccess: () => {
          toast.success("Simp target was created");
          close();
        },
        onError: (error) => {
          toast.error((error as any)?.message);
        },
      }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-lg">
              <h2 className="text-lg text-center font-semibold mb-4">
                Add New Simp Target
              </h2>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" {...form.register("description")} />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={close}>
                    Cancel
                  </Button>
                  <Button type="submit">Add New Target</Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
