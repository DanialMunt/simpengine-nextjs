import { api } from "@/lib/axios";
import {Event} from "@/types/events";
import { RomanticEvent } from "@/types/event-schema";
import { TemplateStep } from "@/types/event-schema";
import { CreateStepsPayload } from "@/types/event-schema";


export const publishRomanticEvent = async (id: number) => {
    const res = await api.post(`/romantic-event/${id}/publish`, id);

    return res.data
}


export const deleteRomanticEventApi = async (id: number): Promise<void> => {
  await api.delete(`/romantic-event/${id}`)
}

