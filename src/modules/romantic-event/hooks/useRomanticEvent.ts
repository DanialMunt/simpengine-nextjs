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

import { createRomanticEventApi } from "../api/romanticEventApi";



export const useCreateSimpTarget = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSimpTargetApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["simpTargets"] });
    },
  });
};

export const useCreateRomanticEvent = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createRomanticEventApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["romanticEvents"] });
        },
    });
}


