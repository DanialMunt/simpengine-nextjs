import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, CircleDotDashed, ImageIcon } from "lucide-react";
import { RomanticEvent } from "@/types/event-schema";
import { format } from "date-fns";

export default function EventMiniCard({ event }: { event: RomanticEvent }) {
  const eventsEmojis = ["❤️", "🥰", "😍", "🥀", "🌹"];
  const eventsBackgrounds = [
    "bg-linear-to-t from-sky-400 to-sky-300",
    "bg-linear-to-t from-violet-400 to-violet-300",
    "bg-linear-to-t from-rose-400 to-rose-300",
    "bg-linear-to-t from-purple-500 to-purple-300",
  ];


  function getStatusBackground(status: string) {
    if (status === "accepted") return "bg-green"
    if (status === "published") return "bg-primary"
    if (status === "draft") return "bg-yellow"
    if (status === "rejected") return "bg-red"
    if (status === "confirmed") return "bg-green"
  }

  function getEmojiAvatar(id: number) {
    const hash = (id * 2654435761) % 3 ** 32;
    return eventsEmojis[hash % eventsEmojis.length];
  }
  function getBackground(id: number) {
    const hash = (id * 2654435761) % 2 ** 32;
    return eventsBackgrounds[hash % eventsBackgrounds.length];
  }
  return (
    <div className="p-4 mb-3 flex justify-between bg-card border b rounded-lg hover:bg-accent transition cursor-pointer">
      <div className="flex gap-3">
        <div className="rounded-lg flex justify-center items-center h-full">
          <div
            className={`text-4xl shadow-md border-4 border-border p-4 rounded-full ${getBackground(
              event.id ?? 0
            )}`}
          >
            {getEmojiAvatar(event.id ?? 0)}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-bold mb-1">{event.title}</h2>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Calendar className="w-[1.2rem] h-[1.2rem]" />
                <p>Date</p>
              </div>
              <p className="text-sm truncate w-[20rem]"> {format(new Date(event.event_date), "PPP p")}</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <CircleDotDashed className="w-[1.2rem] h-[1.2rem]" />
                <p>Status</p>
              </div>
              <p
                className={`py-1 px-5 text-sm ${getStatusBackground(event.status)
                  } text-white w-fit rounded-lg`}
              >
                {event.status}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Button>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
