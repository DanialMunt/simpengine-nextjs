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


export const useCreateRomanticEvent = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createRomanticEventApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["romanticEvents"] });
        },
    });
}


