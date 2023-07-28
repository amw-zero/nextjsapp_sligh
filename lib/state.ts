import { createStore } from 'zustand/vanilla';

// Ideas: 
// * Create full stack counter example. Not sure what properties would be. Model is easy though.
// * Personal finance app. Done this a million times. Could be fine.
// * Security example - authorization in model, leave out check in server. 
// * Have zustand state for entire application, just for testing - an "application" is 
//   the combination of the client state (meant for UI data binding) and server state

export type ClientState = {
    count: number;
    isLoading: boolean;
    increment: () => Promise<void>;
    decrement: () => Promise<void>;
}

export const makeStore = () => createStore<ClientState>()((set) => ({
    count: 0,
    isLoading: false,

    // Action Type: --> state.count, state.isLoading
    // { count: number; isLoading: boolean; }
    increment: async () => new Promise<void>((resolve) => {
        set(() => ({ isLoading: true }));
        setTimeout(() => {
            set((state) => ({ count: state.count + 1, isLoading: false }))
            resolve();
        }, 1000)
    }),

    decrement: async () => new Promise<void>((resolve) => {
        set(() => ({ isLoading: true }));
        setTimeout(() => {
            set((state) => ({ count: state.count - 1, isLoading: false }))
            resolve();
        }, 1000)
    }),
}));

export const store = makeStore();

export class Server {
    count: number = 0;

    increment() {
        this.count += 1;
    }

    decrement() {
        this.count -= 1;
    }
}


