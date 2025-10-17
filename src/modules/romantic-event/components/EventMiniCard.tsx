import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ImageIcon } from "lucide-react";
import { RomanticEvent } from "@/types/event-schema";
import { Event } from "@/types/events";
export default function EventMiniCard({ event }: { event: Event }) {
 
  return (
     <div className="p-4 mb-3 flex justify-between bg-card border b rounded-lg hover:bg-accent transition cursor-pointer">
      <div className="flex gap-3">
        <div className="p-3 bg-gray-200 rounded-lg flex justify-center items-center w-20 h-full">
            <ImageIcon color="gray" className="h-[3rem] w-[3rem]" />
          </div>
        <div className="flex flex-col">
          <h2 className="text-base font-bold mb-1">{event.title}</h2>
          <p className="text-muted-foreground text-xs">{event.description}</p>
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
