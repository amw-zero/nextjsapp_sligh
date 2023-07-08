import { createStore } from 'zustand/vanilla';

type State = {
    count: number;
}

export const store = createStore<State>((set) => ({
    count: 0,
    isLoading: false,
    count2: 0,
    isLoading2: false,

    increment: async () => new Promise<void>((resolve) => {
        set(() => ({ isLoading: true }));
        setTimeout(() => {
            set((state) => ({ count: state.count + 1, isLoading: false }))
            resolve();
        }, 1000)
    }),

    increment2: async () => new Promise<void>((resolve) => {
        set(() => ({ isLoading2: true }));
        setTimeout(() => {
            set((state) => ({ count2: state.count2 + 1, isLoading2: false }))
            resolve();
        }, 1000)
    })
}));
