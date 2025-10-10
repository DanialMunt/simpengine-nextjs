"use client";

import { SimpTarget } from "@/types/simpTarget";
import { useDeleteSimpTarget } from "@/modules/simp-target/hooks/useSimpTarget";
import { Button } from "@/components/ui/button/button";

import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type EventCard = {
  target: SimpTarget;
  onEdit?: (target: SimpTarget) => void;
};

export function EventCard({ target, onEdit }: EventCard) {
  const deleteTarget = useDeleteSimpTarget();
  
 


  
  return (
    <div className="rounded-xl border border-border flex flex-col bg-background hover:border-primary/20 transition h-80 max-h-80">
     
      <div className="flex justify-center relative gap-3 rounded-t-xl h-24 items-center">
       
       
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
        <h2 className="text-lg font-semibold text-gray-800">{target.name}</h2>
        {target.description && (
          <p className="text-sm text-muted-foreground max-h-16">
            {target.description}
          </p>
        )}
      </div>

     
      <div className=" flex justify-center gap-3 p-2">
        <Button>Invite for a date</Button>
        <Button variant="secondary">Check events</Button>
      </div>
    </div>
  );
}
