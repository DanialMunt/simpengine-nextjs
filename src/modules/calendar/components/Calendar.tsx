"use client";

import { useState, useEffect } from "react";
import { addDays, setHours, setMinutes, subDays } from "date-fns";
import { CalendarLoader } from "../components/event-calendar/calendar-loader";
import {
  EventCalendar,
  type CalendarEvent,
} from "../components/event-calendar";
import { mapRomanticEventsToCalendar } from "@/utils/mapEvents";
import { useGetRomanticEvent } from "@/modules/romantic-event/hooks/useRomanticEvent";
// Sample events data with hardcoded times
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Romantic event",
    description: "Romantic event with my love",
    start: subDays(new Date(), 24), // 24 days before today
    end: subDays(new Date(), 23), // 23 days before today
    allDay: true,
    color: "sky",
    location: "Main Conference Hall",
  },
  {
    id: "2",
    title: "Our first romantic event",
    description: "Submit final deliverables",
    start: setMinutes(setHours(subDays(new Date(), 9), 13), 0), // 1:00 PM, 9 days before
    end: setMinutes(setHours(subDays(new Date(), 9), 15), 30), // 3:30 PM, 9 days before
    // color: "amber",
    // location: "Office",
  },
  {
    id: "3",
    title: "New date with Nina",
    description: "Strategic planning for next year",
    start: subDays(new Date(), 13), // 13 days before today
    end: subDays(new Date(), 13), // 13 days before today
    allDay: true,
    color: "orange",
    location: "Main Conference Hall",
  },
  {
    id: "4",
    title: "Date with my simp target",
    description: "Weekly team sync",
    start: setMinutes(setHours(new Date(), 10), 0), // 10:00 AM today
    end: setMinutes(setHours(new Date(), 11), 0), // 11:00 AM today
    color: "sky",
    location: "Conference Room A",
  },
  {
    id: "5",
    title: "Cozy evening with my darling",
    description: "Discuss new project requirements",
    start: setMinutes(setHours(addDays(new Date(), 1), 12), 0), // 12:00 PM, 1 day from now
    end: setMinutes(setHours(addDays(new Date(), 1), 13), 15), // 1:15 PM, 1 day from now
    color: "emerald",
    location: "Downtown Cafe",
  },

  {
    id: "8",
    title: "Date Meeting",
    description: "Weekly team sync",
    start: setMinutes(setHours(addDays(new Date(), 5), 9), 0), // 9:00 AM, 5 days from now
    end: setMinutes(setHours(addDays(new Date(), 5), 10), 30), // 10:30 AM, 5 days from now
    color: "orange",
    location: "Conference Room A",
  },
  {
    id: "9",
    title: "Date with my presious",
    description: "Weekly team sync",
    start: setMinutes(setHours(addDays(new Date(), 5), 14), 0), // 2:00 PM, 5 days from now
    end: setMinutes(setHours(addDays(new Date(), 5), 15), 30), // 3:30 PM, 5 days from now
    color: "sky",
    location: "Conference Room A",
  },
];

export default function Calendar() {
  // const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  // const [isLoading, setIsLoading] = useState(false);
   const { data: events, isLoading } = useGetRomanticEvent();
 const calendarEvents = events
    ? mapRomanticEventsToCalendar(events)
    : []


  // const handleEventAdd = (event: CalendarEvent) => {
  //   setEvents([...events, event]);
  // };

  // const handleEventUpdate = (updatedEvent: CalendarEvent) => {
  //   setEvents(
  //     events.map((event) =>
  //       event.id === updatedEvent.id ? updatedEvent : event
  //     )
  //   );
  // };

  // const handleEventDelete = (eventId: string) => {
  //   setEvents(events.filter((event) => event.id !== eventId));
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-muted-foreground">
        <CalendarLoader />
      </div>
    );
  }

  return (
    // Add min-h-screen to make it full height
    <div className="flex flex-col ">
      <EventCalendar
        events={calendarEvents} //calendarEvents
        // onEventAdd={handleEventAdd}
        // onEventUpdate={handleEventUpdate}
        // onEventDelete={handleEventDelete}
      />
    </div>
  );
}
