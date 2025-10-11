"use client";

import { SimpTarget } from "@/types/simpTarget";
import { useDeleteSimpTarget } from "@/modules/simp-target/hooks/useSimpTarget";
import { Button } from "@/components/ui/button";

import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type SimpTargetCardProps = {
  target: SimpTarget;
  onEdit?: (target: SimpTarget) => void;
};

export function SimpTargetCard({ target, onEdit }: SimpTargetCardProps) {
  const deleteTarget = useDeleteSimpTarget();
  const avatarEmojis = ["👩🏽‍🔧", "👩🏿‍🎓", "👰🏼‍♀️", "👩🏼‍⚕️", "🧕🏽", "👩🏽‍🍳"];
  const avatarBackgrounds = [
    "bg-linear-to-t from-sky-400 to-sky-300",
    "bg-linear-to-t from-violet-400 to-violet-300",
    "bg-linear-to-t from-rose-400 to-rose-300",
    "bg-linear-to-t from-purple-500 to-purple-300",
    "bg-linear-to-t from-indigo-500 to-indigo-300",
    "bg-linear-to-t from-pink-500 to-pink-300",
  ];

 
  function getEmojiAvatar(id: number) {
      const hash = (id * 2654435761) % 3 ** 32; 
    return avatarEmojis[hash % avatarEmojis.length];
  }
  function getBackground(id: number) {
  const hash = (id * 2654435761) % 2 ** 32; 
  return avatarBackgrounds[hash % avatarBackgrounds.length];
}

  return (
    <div className="rounded-xl border w-full border-border flex flex-col bg-card  hover:border-foreground/15 transition h-80 max-h-80">
     
      <div
        className={`flex justify-center relative gap-3 rounded-t-xl h-24 items-center ${getBackground(
          target.id
        )}`}
      >
        <div className="text-6xl absolute top-10 bg-white shadow-md border-4 border-border p-4 rounded-full">
          {getEmojiAvatar(target.id)}
        </div>

       
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-primary/10 cursor-pointer rounded-xl">
                <EllipsisVertical color="white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {onEdit && (
                <DropdownMenuItem
                  onClick={() => {
                    onEdit(target);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={deleteTarget.isPending}
                onClick={() => deleteTarget.mutate(target.id)}
                className="text-red-600 focus:bg-red-100"
              >
                {deleteTarget.isPending ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

  
      <div className="flex flex-col mb-5 gap-2 mt-7 p-2 ">
        <h2 className="text-lg font-semibold ">{target.name}</h2>
        {/* <p className="py-1 w-fit px-3 bg-chart-2 text-sm rounded-md text-white">
          Current target
        </p> */}
        {target.description && (
          <p className="text-sm text-muted-foreground max-h-16">
            {target.description}
          </p>
        )}
      </div>

     
      <div className=" flex flex-col justify-center gap-3 p-2">
        <Button>Invite for a date</Button>
        <Button variant="secondary">Check events</Button>
      </div>
    </div>
  );
}
