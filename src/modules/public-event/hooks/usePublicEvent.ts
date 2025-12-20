"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    acceptPublicEvent,
    getPublicEvent,
    rejectPublicEvent,
    submitPublicEventAnswers,
} from "../api/publicEventApi";
import { AnswerPayload } from "../types";

export const useGetPublicEvent = (token: string) => {
    return useQuery({
        queryKey: ["publicEvent", token],
        queryFn: () => getPublicEvent(token),
        enabled: !!token,
    });
};

export const useAcceptPublicEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (token: string) => acceptPublicEvent(token),
        onSuccess: (_, token) => {
            queryClient.invalidateQueries({ queryKey: ["publicEvent", token] });
        },
    });
};

export const useRejectPublicEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (token: string) => rejectPublicEvent(token),
        onSuccess: (_, token) => {
            queryClient.invalidateQueries({ queryKey: ["publicEvent", token] });
        },
    });
};

export const useSubmitPublicEventAnswers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            token,
            payload,
        }: {
            token: string;
            payload: AnswerPayload;
        }) => submitPublicEventAnswers(token, payload),
        onSuccess: (_, { token }) => {
            queryClient.invalidateQueries({ queryKey: ["publicEvent", token] });
        },
    });
};
