import { api } from "@/lib/axios";
import { RomanticEvent } from "@/types/event-schema";


export const createRomanticEventApi = async (
  data: Omit<RomanticEvent, "id">
): Promise<RomanticEvent> => {
  const res = await api.post<RomanticEvent>("/romantic-event", data);
  return res.data;
};

export const getRomanticEventsApi = async (params?: Partial<RomanticEvent>): Promise<RomanticEvent[]> => {
  const res = await api.get<RomanticEvent[]>("/romantic-event", {
    ...(params && Object.keys(params).length > 0 ? { params } : {}),
  });
  return res.data;
}

export const deleteRomanticEventApi = async (id: number): Promise<void> => {
  await api.delete(`/romantic-event/${id}`)
}