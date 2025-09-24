"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSimpTargetsApi,
  getSimpTargetByIdApi,
  createSimpTargetApi,
  updateSimpTargetApi,
  deleteSimpTargetApi,
} from "@/modules/simp-target/api/simpTargetApi";
import { SimpTarget } from "@/types/simpTarget";


export const useSimpTargets = (params?: Partial<SimpTarget>) => {
  return useQuery({
    queryKey: ["simpTargets", params],
    queryFn: () => getSimpTargetsApi(params),
  });
};

export const useSimpTarget = (id: number) => {
  return useQuery({
    queryKey: ["simpTarget", id],
    queryFn: () => getSimpTargetByIdApi(id),
    enabled: !!id, // only run if id is truthy
  });
};

export const useCreateSimpTarget = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSimpTargetApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["simpTargets"] });
    },
  });
};

export const useUpdateSimpTarget = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<SimpTarget, "id">> }) =>
      updateSimpTargetApi(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["simpTargets"] });
      qc.invalidateQueries({ queryKey: ["simpTarget", updated.id] });
    },
  });
};

export const useDeleteSimpTarget = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSimpTargetApi(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["simpTargets"] });
    },
  });
};
