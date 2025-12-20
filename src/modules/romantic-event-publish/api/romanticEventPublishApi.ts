import { api } from "@/lib/axios";


export const publishRomanticEvent = async (id: number) => {
  const res = await api.post(`/romantic-event/${id}/publish`, id);

  return res.data
}


export const deleteRomanticEventApi = async (id: number): Promise<void> => {
  await api.delete(`/romantic-event/${id}`)
}

