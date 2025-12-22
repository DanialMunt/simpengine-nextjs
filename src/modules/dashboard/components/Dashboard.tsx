
import { MessageCircleHeart } from "lucide-react";
import { User } from "lucide-react";
import {
  CircleX,
  BadgeCheck,
} from "lucide-react";

import { useSimpTargets } from "@/modules/simp-target/hooks/useSimpTarget";
import { useGetRomanticEvent } from "@/modules/romantic-event/hooks/useRomanticEvent";
import SimpTargetMiniCard from "@/modules/simp-target/components/SimpTargetMiniCard";
import EventMiniCard from "@/modules/romantic-event/components/EventMiniCard";
import MiniCardSkeleton from "@/components/ui/loadingComp/miniCardSkeleton";
import { EventCalendar } from "@/modules/calendar/components/event-calendar";
import { mapRomanticEventsToCalendar } from "@/utils/mapEvents";
import { ScrollableCard } from "./ScrollableCard";





export default function Dashboard() {

  const stats = [
    {
      name: "All dates",
      num: 12,
      img: <MessageCircleHeart color="white" />,
      color: "bg-primary",
    },
    {
      name: "All targets",
      num: 4,
      img: <User color="white" />,
      color: "bg-blue",
    },
    {
      name: "Successful dates",
      num: 9,
      img: <BadgeCheck color="white" />,
      color: "bg-green",
    },
    {
      name: "Declined dates",
      num: 3,
      img: <CircleX color="white" />,
      color: "bg-red",
    },
  ];

  const { data: targets, isLoading: targetsLoading } = useSimpTargets();

  const { data: romanticEvents, isLoading: EventsLoading } = useGetRomanticEvent();
  const calendarEvents = romanticEvents
    ? mapRomanticEventsToCalendar(romanticEvents)
    : []
  return (
    <section className="flex flex-col gap-4 h-full overflow-hidden">
      {/* Stats Section - Auto height */}
      <section className="flex-shrink-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((info, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg flex gap-5 bg-card"
            >
              <div
                className={`min-w-12 min-h-12 max-w-12 max-h-12 rounded-full flex ${info.color} justify-center items-center`}
              >
                {info.img}
              </div>
              <div className="flex flex-col">
                <h2 className="text-md text-muted-foreground">{info.name}</h2>
                <p className="text-xl font-semibold">{info.num}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="flex-shrink-0 h-[40vh] md:h-[38vh]">
        <div className="h-full overflow-auto border rounded-lg">
          <EventCalendar
            events={calendarEvents}
            initialView="week"
          />
        </div>
      </section>


      <section className="flex-shrink-0 h-[70vh] md:h-[30vh]">
        <div className="flex h-full gap-4 flex-col lg:flex-row">
          <ScrollableCard
            title="Romantic Events"
            viewAllHref="/romantic-event"
            isLoading={EventsLoading}
            emptyMessage="No events found"
          >
            {EventsLoading ? (
              <MiniCardSkeleton />
            ) : romanticEvents &&
              Array.isArray(romanticEvents) &&
              romanticEvents.length > 0 ? (
              romanticEvents.map((event, index) => (
                <EventMiniCard key={index} event={event} />
              ))
            ) : null}
          </ScrollableCard>

          <ScrollableCard
            title="Simp targets"
            viewAllHref="/simp-target"
            isLoading={targetsLoading}
            emptyMessage="No targets found"
          >
            {targetsLoading ? (
              <MiniCardSkeleton />
            ) : targets && Array.isArray(targets) && targets.length > 0 ? (
              targets.map((target, index) => (
                <SimpTargetMiniCard key={index} target={target} />
              ))
            ) : null}
          </ScrollableCard>
        </div>
      </section>
    </section>
  );
}
