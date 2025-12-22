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
    <div className="p-3 sm:p-4 mb-3 flex justify-between bg-card border b rounded-lg hover:bg-accent transition cursor-pointer">
      <div className="flex gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 aspect-square flex items-center justify-center text-2xl sm:text-4xl shadow-md border-2 sm:border-4 border-border rounded-full ${getBackground(
              event.id ?? 0
            )}`}
          >
            {getEmojiAvatar(event.id ?? 0)}
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="text-sm sm:text-base font-bold mb-1 truncate">{event.title}</h2>
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex gap-2 items-center min-w-0">
              <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-[1.2rem] sm:h-[1.2rem]" />
                <p className="hidden sm:inline">Date</p>
              </div>
              <p className="text-xs sm:text-sm truncate min-w-0">{format(new Date(event.event_date), "PPP")}</p>
            </div>

            <div className="flex gap-2 items-center min-w-0">
              <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm flex-shrink-0">
                <CircleDotDashed className="w-4 h-4 sm:w-[1.2rem] sm:h-[1.2rem]" />
                <p className="hidden sm:inline">Status</p>
              </div>
              <p
                className={`py-0.5 sm:py-1 px-3 sm:px-5 text-xs sm:text-sm ${getStatusBackground(event.status)
                  } text-white w-fit rounded-lg`}
              >
                {event.status}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-shrink-0">
        <Button size="sm" className="h-8 w-8 sm:h-10 sm:w-10 p-0">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
}
