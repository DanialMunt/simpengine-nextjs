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
import { createRomanticEventApi, getRomanticEventsApi } from "../api/romanticEventApi";

export const useGetRomanticEvent = (params?: Partial<Event>) => {
  return useQuery({
    queryKey: ["events", params],
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


