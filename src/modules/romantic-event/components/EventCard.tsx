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

const eventsEmojis = ["❤️", "🥰", "😍", "🥀", "🌹"];
const eventsBackgrounds = [
  "bg-linear-to-t from-sky-400 to-sky-300",
  "bg-linear-to-t from-violet-400 to-violet-300",
  "bg-linear-to-t from-rose-400 to-rose-300",
  "bg-linear-to-t from-purple-500 to-purple-300",
  "bg-linear-to-t from-indigo-500 to-indigo-300",
  "bg-linear-to-t from-pink-500 to-pink-300",
];

function getEmojiAvatar(id: number) {
  const hash = (id * 2654435761) % 3 ** 32;
  return eventsEmojis[hash % eventsEmojis.length];
}
function getBackground(id: number) {
  const hash = (id * 2654435761) % 2 ** 32;
  return eventsBackgrounds[hash % eventsBackgrounds.length];
}

export function EventCard({ event, onEdit }: EventCard) {
  const deleteRomanticEvent = useDeleteRomanticEvent();

  return (
    <div className="rounded-xl border border-border flex flex-col bg-card hover:border-foreground/15 gap-5 p-3 max-h-70 ">
      <div className="rounded-lg flex justify-between ">
        <div className="flex items-center gap-2">
          <div
            className={`text-6xl shadow-md border-4 border-border p-4 rounded-full ${getBackground(
              event.id
            )}`}
          >
            {getEmojiAvatar(event.id)}
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

      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Calendar className="w-[1.2rem] h-[1.2rem]" />
            <p>Date</p>
          </div>
          <p>{event.event_date.slice(0, 10)}</p>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <CircleDotDashed className="w-[1.2rem] h-[1.2rem]" />
            <p>Status</p>
          </div>
          <p
            className={`py-1 px-5 ${
              event.status === "accepted" ? "bg-green" : "bg-red"
            } text-white w-fit rounded-lg`}
          >
            {event.status}
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <Button className="w-full">Publish Event</Button>
      </div>
    </div>
  );
}
