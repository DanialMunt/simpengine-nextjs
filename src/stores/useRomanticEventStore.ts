// useRomanticEventStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RomanticEvent } from "@/types/event-schema";

type RomanticEventState = Partial<RomanticEvent> & {
  setData: (data: Partial<RomanticEvent>) => void;
  reset: () => void;
};

export const useRomanticEventStore = create<RomanticEventState>()(
  persist(
    (set) => ({
      title: "",
      description: "",
      simp_target_id: undefined,
      event_date: "",
      steps: [],
      setData: (data) => set((state) => ({ ...state, ...data })),
      reset: () =>
        set({
          title: "",
          description: "",
          simp_target_id: undefined,
          event_date: "",
          steps: [],
        }),
    }),
    {
      name: "romantic-event-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
