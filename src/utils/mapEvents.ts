
import {
  type CalendarEvent,
} from "./../modules/calendar/components/event-calendar";
import { Event } from "@/types/events";

export function mapRomanticEventsToCalendar(events: Event[]): CalendarEvent[] {
  return events.map((e) => ({
    id: e.id?.toString() ?? crypto.randomUUID(),
    title: e.title,
    description: e.description,
    start: new Date(e.event_date),
    end: new Date(e.event_date),
    allDay: true,
    color: statusToColor(e.status),
    location: undefined,
  }))
}

function statusToColor(status: string): CalendarEvent["color"] {
  switch (status.toLowerCase()) {
    case "planned":
      return "sky"
    case "completed":
      return "emerald"
    case "cancelled":
      return "rose"
    default:
      return "amber"
  }
}
