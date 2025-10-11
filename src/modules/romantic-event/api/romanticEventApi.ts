import { z } from "zod";
import { api } from "@/lib/axios";
import {Event} from "@/types/events";
import { romanticEvent } from "@/types/event-schema";
type RomanticEvent = z.infer<typeof romanticEvent>;


export const createRomanticEventApi = async (
  data: Omit<RomanticEvent, "id"> 
): Promise<RomanticEvent> => {
  const res = await api.post<RomanticEvent>("/romantic-event", data);
  return res.data;
};

export const getRomanticEventsApi = async (params?: Partial<Event>): Promise<Event[]> => {
  const res = await api.get<Event[]>("/romantic-event", {
    ...(params && Object.keys(params).length > 0 ? { params } : {}),
  });
  return res.data;
}

export const deleteRomanticEventApi = async (id: number): Promise<void> => {
  await api.delete(`/romantic-event/${id}`)
}