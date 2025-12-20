import { api } from "@/lib/axios";
import { AnswerPayload, PublicEvent } from "../types";

export const getPublicEvent = async (token: string): Promise<PublicEvent> => {
    const res = await api.get(`/public/romantic-event/${token}`);
    return res.data;
};

export const acceptPublicEvent = async (token: string): Promise<void> => {
    await api.post(`/public/romantic-event/${token}/accept`);
};

export const rejectPublicEvent = async (token: string): Promise<void> => {
    await api.post(`/public/romantic-event/${token}/reject`);
};

export const submitPublicEventAnswers = async (
    token: string,
    payload: AnswerPayload
): Promise<void> => {
    await api.post(`/public/romantic-event/${token}/answers`, payload);
};
