import { api } from "@/lib/axios";
import { SimpTarget } from "@/types/simpTarget";
import {Event} from "@/types/events";

export const getEventsApi = async (params?: Partial<Event>): Promise<Event[]> => {
  const res = await api.get<Event[]>("/romantic-event", {
    ...(params && Object.keys(params).length > 0 ? { params } : {}),
  });
  return res.data;
}
