"use client"
import { useSimpTargets, useCreateSimpTarget } from "@/hooks/simp-target/useSimpTarget";

export default function SimpTargetPage() {
  const { data: targets, isLoading } = useSimpTargets();
  const createTarget = useCreateSimpTarget();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Targets</h1>
      <ul>
        {targets?.map((t) => (
          <li key={t.id}>{t.name} 
          {t.description}
          </li>
   
        ))}
      </ul>

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