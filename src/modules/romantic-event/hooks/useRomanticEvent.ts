"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RomanticEvent } from "@/types/event-schema";
import { createRomanticEventApi, getRomanticEventsApi, deleteRomanticEventApi } from "../api/romanticEventApi";
import { toast } from "sonner";

export const useGetRomanticEvent = (params?: Partial<RomanticEvent>) => {
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


