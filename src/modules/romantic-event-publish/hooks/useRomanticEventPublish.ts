"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


import { publishRomanticEvent } from "../api/romanticEventPublishApi";



export const usePublishRomanticEvent = () => {
     const qc = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => publishRomanticEvent(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["romanticEventsPublish"] });
        },
    });
}x



