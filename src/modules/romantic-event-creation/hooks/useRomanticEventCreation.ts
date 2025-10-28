"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTemplateStepsApi,
  createRomanticEventStepApi,
} from "../api/romanticEventCreationApi";
import { TemplateStep } from "@/types/event-schema";
import { CreateStepsPayload } from "@/types/event-schema";
export const useGetTemplateSteps = (params?: Partial<TemplateStep>) => {
  return useQuery({
    queryKey: ["templateSteps", params],
    queryFn: () => getTemplateStepsApi(params),
  });
};

export const useCreateRomanticEventStep = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      romanticEventId,
      data,
    }: {
      romanticEventId: number;
      data: CreateStepsPayload; 
    }) => createRomanticEventStepApi(romanticEventId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["romanticEvents"] });
    },
  });
};

