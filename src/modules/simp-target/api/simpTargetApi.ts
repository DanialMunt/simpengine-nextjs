import { api } from "@/lib/axios";
import { SimpTarget, CreateSimpTarget, UpdateSimpTarget } from "@/types/simpTarget";

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
  data: CreateSimpTarget 
): Promise<SimpTarget> => {
  const res = await api.post<SimpTarget>("/simp-target", data);
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