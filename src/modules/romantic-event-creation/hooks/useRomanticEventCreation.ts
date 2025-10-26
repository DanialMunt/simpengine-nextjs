"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@/types/events";
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

// export const useCreateRomanticEvent = () => {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: createRomanticEventApi,
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: ["romanticEvents"] });
//         },
//     });
// }

// export const useDeleteRomanticEvent = () => {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: (id: number) => deleteRomanticEventApi(id),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["romanticEvents"] });
//     },
//   });
// };
