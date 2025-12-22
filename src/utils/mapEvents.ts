
import {
  type CalendarEvent,
} from "./../modules/calendar/components/event-calendar";
import { RomanticEvent } from "@/types/event-schema";

export function mapRomanticEventsToCalendar(events: RomanticEvent[]): CalendarEvent[] {
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
    case "accepted":
    case "confirmed":
      return "emerald"  // Green - success states
    case "published":
      return "sky"      // Blue - published/live state
    case "draft":
      return "amber"    // Yellow - in progress
    case "rejected":
    case "cancelled":
      return "rose"     // Red/Pink - negative states
    case "planned":
      return "violet"   // Purple - planned future events
    default:
      return "orange"   // Orange - unknown/other states
  }
}
