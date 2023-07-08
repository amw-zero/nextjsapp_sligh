import { createStore } from 'zustand/vanilla';

type State = {
    count: number;
}

export const store = createStore<State>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 }))
}));
