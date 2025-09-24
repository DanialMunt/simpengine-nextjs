"use client";

import { SimpTarget } from "@/types/simpTarget";
import { useDeleteSimpTarget } from "@/modules/simp-target/hooks/useSimpTarget";

type SimpTargetCardProps = {
  target: SimpTarget;
  onEdit?: (target: SimpTarget) => void;
};

export function SimpTargetCard({ target, onEdit }: SimpTargetCardProps) {
  const deleteTarget = useDeleteSimpTarget();
  const avatarEmojis = ["👩🏻", "👩🏽", "👩🏼‍🦱", "👩🏾‍🦰", "👱🏻‍♀️", "🧕🏽", "👩🏻‍🎓"];
  function getEmojiAvatar(id: number) {
    return avatarEmojis[id % avatarEmojis.length];
  }
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-background hover:bg-accent transition">
      <div className="flex gap-3 items-center">
        <div className="text-4xl">{getEmojiAvatar(target.id)}</div>
        <h2 className="text-lg font-semibold text-gray-800">{target.name}</h2>
      </div>


      {target.description && (
        <p className="text-sm text-gray-600 mt-1">{target.description}</p>
      )}

      <div className="flex gap-2 mt-4">
        {onEdit && (
          <button
            onClick={() => onEdit(target)}
            className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTarget.mutate(target.id)}
          disabled={deleteTarget.isPending}
          className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
        >
          {deleteTarget.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
