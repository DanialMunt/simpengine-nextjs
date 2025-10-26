import { api } from "@/lib/axios";
import {Event} from "@/types/events";
import { RomanticEvent } from "@/types/event-schema";
import { TemplateStep } from "@/types/event-schema";
import { CreateStepsPayload } from "@/types/event-schema";
export const getTemplateStepsApi = async (params?: Partial<TemplateStep>): Promise<TemplateStep[]> => {
  const res = await api.get<TemplateStep[]>("/romantic-event/template-steps", {
      ...(params && Object.keys(params).length > 0 ? { params } : {}),
  });
  return res.data;
}

export const createRomanticEventApi = async (
  data: Omit<RomanticEvent, "id"> 
): Promise<RomanticEvent> => {
  const res = await api.post<RomanticEvent>("/romantic-event", data);
  return res.data;
};

export const createRomanticEventStepApi = async (
  romanticEventId: number,
  payload: CreateStepsPayload
) => {
  const res = await api.post(`/romantic-event/${romanticEventId}/steps`, payload);
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