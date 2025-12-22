import {
  MessageCircleHeart,
  User,
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
      icon: <MessageCircleHeart className="text-white" />,
      color: "bg-primary",
    },
    {
      name: "All targets",
      num: 4,
      icon: <User className="text-white" />,
      color: "bg-blue",
    },
    {
      name: "Successful dates",
      num: 9,
      icon: <BadgeCheck className="text-white" />,
      color: "bg-green",
    },
    {
      name: "Declined dates",
      num: 3,
      icon: <CircleX className="text-white" />,
      color: "bg-red",
    },
  ];

  const { data: targets, isLoading: targetsLoading } = useSimpTargets();
  const { data: romanticEvents, isLoading: eventsLoading } =
    useGetRomanticEvent();

  const calendarEvents = romanticEvents
    ? mapRomanticEventsToCalendar(romanticEvents)
    : [];

  return (
    <section className="flex flex-col h-full gap-4 overflow-hidden min-h-0">

      <section className="shrink-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-lg border bg-card"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}
              >
                {stat.icon}
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  {stat.name}
                </span>
                <span className="text-xl font-semibold">{stat.num}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="shrink-0 h-[280px] sm:h-[320px]">
        <div className="h-full overflow-auto rounded-lg border">
          <EventCalendar
            events={calendarEvents}
            initialView="week"
          />
        </div>
      </section>


      <section className="shrink-0 min-h-[30vh] max-h-[35vh] ">

        <div className="flex h-full min-h-0 flex-col lg:flex-row gap-4">
          <ScrollableCard
            title="Romantic Events"
            viewAllHref="/romantic-event"
            isLoading={eventsLoading}
            emptyMessage="No events found"
          >
            {eventsLoading ? (
              <MiniCardSkeleton />
            ) : romanticEvents?.length ? (
              romanticEvents.map((event, index) => (
                <EventMiniCard key={index} event={event} />
              ))
            ) : null}
          </ScrollableCard>

          <ScrollableCard
            title="Simp Targets"
            viewAllHref="/simp-target"
            isLoading={targetsLoading}
            emptyMessage="No targets found"
          >
            {targetsLoading ? (
              <MiniCardSkeleton />
            ) : targets?.length ? (
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
