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
import { Event } from "@/types/events";
import { createRomanticEventApi, getRomanticEventsApi, deleteRomanticEventApi } from "../api/romanticEventApi";
import { RomanticEvent } from "@/types/event-schema"
export const useGetRomanticEvent = (params?: Partial<Event>) => {
  return useQuery({ 
    queryKey: ["romanticEvents", params],
    queryFn: () => getRomanticEventsApi(params),
  });
}

export const useCreateRomanticEvent = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createRomanticEventApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["romanticEvents"] });
        },
    });
}

export const useDeleteRomanticEvent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteRomanticEventApi(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["romanticEvents"] });
    },
  });
};


