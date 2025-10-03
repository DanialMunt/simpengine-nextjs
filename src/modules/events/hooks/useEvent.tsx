import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEventsApi,
} from "@/modules/events/api/eventsApi";
import { Event } from "@/types/events";

export const useEvents = (params?: Partial<Event>) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => getEventsApi(params),
  });
}