import { z } from "zod";
import { api } from "@/lib/axios";
import { SimpTarget } from "@/types/simpTarget";
import { romanticEvent } from "@/types/event-schema";
type RomanticEvent = z.infer<typeof romanticEvent>;

export const getSimpTargetsApi = async (params?: Partial<SimpTarget>): Promise<SimpTarget[]> => {
  const res = await api.get<SimpTarget[]>("/simp-target", {
    ...(params && Object.keys(params).length > 0 ? { params } : {}),
  });
  return res.data;
};

export const getSimpTargetByIdApi = async (id: number): Promise<SimpTarget> => {
  const res = await api.get(`/simp-target/${id}`);
  return res.data;
};

export const createSimpTargetApi = async (
  data: Omit<SimpTarget, "id"> 
): Promise<SimpTarget> => {
  const res = await api.post<SimpTarget>("/simp-target", data);
  return res.data;
};

export const createRomanticEventApi = async (
  data: Omit<RomanticEvent, "id"> 
): Promise<RomanticEvent> => {
  const res = await api.post<RomanticEvent>("/romantic-event", data);
  return res.data;
};

export const updateSimpTargetApi = async (
  id: number,
  data: Partial<Omit<SimpTarget, "id">> 
): Promise<SimpTarget> => {
  const res = await api.put<SimpTarget>(`/simp-target/${id}`, data);
  return res.data;
};

export const deleteSimpTargetApi = async (id: number): Promise<void> => {
  await api.delete(`/simp-target/${id}`);
};