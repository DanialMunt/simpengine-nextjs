"use client";

import { SimpTarget } from "@/types/simpTarget";
import { useDeleteRomanticEvent } from "../hooks/useRomanticEvent";
import { Button } from "@/components/ui/button";
import { RomanticEvent } from "@/types/event-schema";
import {
  EllipsisVertical,
  Image as ImageIcon,
  Calendar,
  CircleDotDashed,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Event } from "@/types/events";
type EventCard = {
  event: Event;
  onEdit?: (event: Event) => void;
};

export function EventCard({ event, onEdit }: EventCard) {
  const deleteRomanticEvent = useDeleteRomanticEvent();

  return (
    <div className="rounded-xl border border-border flex flex-col bg-card hover:border-foreground/15 gap-2 p-3 max-h-70 ">
      <div className="rounded-lg flex justify-between ">
        <div className="flex items-center gap-2">
          <div className="p-3 bg-gray-200 rounded-lg flex justify-center items-center w-36 h-36">
            <ImageIcon color="gray" className="h-[3rem] w-[3rem]" />
          </div>
          <div className="flex flex-col gap-1  ">
            <h2 className="text-lg font-semibold">{event.title}</h2>

            <p className="text-sm text-muted-foreground max-h-16">
              {event.description}
            </p>
          </div>
        </div>

        <div className="flex justify-center relative gap-3 rounded-t-xl h-12 items-center">
          <div className="absolute right-1 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2  cursor-pointer rounded-xl">
                  <EllipsisVertical />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {onEdit && (
                  <DropdownMenuItem
                    onClick={() => {
                      onEdit(event);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={deleteRomanticEvent.isPending}
                  onClick={() => {
                    if (event.id !== undefined) {
                      deleteRomanticEvent.mutate(event.id);
                    } else {
                      console.warn("Event id is missing");
                    }
                  }}
                  className="text-red-600 focus:bg-red-100"
                >
                  {deleteRomanticEvent.isPending ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Calendar className="w-[1.2rem] h-[1.2rem]" />
            <p>Date</p>
          </div>

          <p>{event.event_date}</p>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <CircleDotDashed className="w-[1.2rem] h-[1.2rem]" />
            <p>Status</p>
          </div>

          <p className="py-1 px-5 bg-yellow-500 text-white w-fit rounded-lg">
            {event.status}
          </p>
        </div>
      </div>
    </div>
  );
}
