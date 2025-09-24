"use client"
import { CardSkeleton } from "@/components/ui/loading/cardSkeleton";
import { useSimpTargets, useCreateSimpTarget } from "@/modules/simp-target/hooks/useSimpTarget";
import { SimpTargetCard } from "./SimpTargetCard";
export default function SimpTargetPage() {
  const { data: targets, isLoading } = useSimpTargets();
  const createTarget = useCreateSimpTarget();

  if (isLoading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>;

  return (
    <div className="flex flex-col gap-5">
      <h1>All Targets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {targets?.map((t) => (
        <SimpTargetCard
          key={t.id}
          target={t}
          onEdit={(target) => console.log("Edit clicked:", target)}
        />
      ))}
    </div>

      <button
        onClick={() =>
          createTarget.mutate({ name: "New Target", description: "Test" })
        }
      >
        Add Target
      </button>
    </div>
  );
}