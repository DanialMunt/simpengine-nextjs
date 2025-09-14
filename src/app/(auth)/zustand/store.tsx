import {create} from "zustand"

type CounterStore = {
    count: number;
    increment: () => void
    incrementAsync: () => Promise<void>
    decrement: () => void
}

export const useCounterStore = create<CounterStore>((set)=> ({
    count: 0,
    increment: () => {
        set((state) => ({count: state.count + 1}))
    },
    incrementAsync: async () => {
        const response = await new Promise((resolve) => setTimeout(resolve, 1000))
        set((state) => ({count: state.count + 1})) //put response here in {}
    },
    decrement: () => {
        set((state) => ({count: state.count - 1}))
    }
}))