import { createStore } from 'zustand/vanilla';

// Ideas: 
// * Create full stack counter example. Not sure what properties would be. Model is easy though.
// * Personal finance app. Done this a million times. Could be fine.
// * Security example - authorization in model, leave out check in server. 
// * Have zustand state for entire application, just for testing - an "application" is 
//   the combination of the client state (meant for UI data binding) and server state

export interface Counter {
    name: string;
    value: number;
}

export type ClientState = {
    counters: Counter[];
    isLoading: boolean;
    error: string | null;

    Get: () => Promise<void>;
    Create: (name: string) => Promise<void>;
    Increment: (name: string) => Promise<void>;
    decrement: () => Promise<void>;
}

type FetchResult<T> = 
    | { type: "success", data: T }
    | { type: "error", error: string };

type FetchParser<T> = (response: any) => T | undefined;

async function fetchData<T>(path: string, init: RequestInit, parser: FetchParser<T>): Promise<FetchResult<T>> {
    try {
        const resp = await fetch(path, init);

        const data = parser(await resp.json());
        if (data) {
            return { type: "success", data };
        } else {
            return { type: "error", error: "fetch_parse_err" };
        }
    } catch (e) {
        return { type: "error", error: "fetch_err" };
    }
}

function parseCounter(resp: any): Counter | undefined {
    if (resp.name !== undefined && resp.value !== undefined) {
        return resp;
    }

    return;
}


function parseCounters(resp: any): Counter[] | undefined {
    let parsed = resp.map(parseCounter).filter((c: Counter) => c);
    if (parsed.length === 0) {
        return;
    }

    return parsed;
}

export const makeStore = () => createStore<ClientState>()((set) => ({
    counters: [],
    isLoading: false,
    error: null,

    Get: async () => new Promise<void>(async (resolve) => {
        set(() => ({ isLoading: true }));
        const result = await fetchData("api/counters", { method: "GET" }, parseCounters)
        switch (result.type) {
            case "success":
                set(() => ({ counters: result.data, isLoading: false }));
                break;
            case "error":
                set(() => ({ error: result.error, isLoading: false }));
                break;
        }
        resolve();
    }),

    Increment: async (name: string) => new Promise<void>(async (resolve) => {
        set(() => ({ isLoading: true }));
        const body = JSON.stringify({ name });
        const result = await fetchData("api/counters/increment", { method: "POST", body }, parseCounter);
        switch (result.type) {
            case "success":
                set((state) => {
                    // Note - see if this fails if just the fetch request is sent, i.e. if just the server state is updated
                    // and client becomes incoherent.
                    const index = state.counters.findIndex((c: Counter) => c.name === name);
                    const nextCounters = [...state.counters];
                    nextCounters[index] = result.data;

                    return {
                        counters: nextCounters,
                        isLoading: false,
                    }
                });
                break;
            case "error":
                set(() => ({ error: result.error, isLoading: false }));
                break;
        }
        resolve();
    }),

    Create: async (name: string) => new Promise<void>(async (resolve) => {
        set(() => ({ isLoading: true }));
        const body = JSON.stringify({ name });
        const result = await fetchData("api/counters/create", { method: "POST", body }, parseCounter);
        switch (result.type) {
            case "success":
                set((state) => {
                    return {
                        counters: [...state.counters, result.data],
                        isLoading: false,
                    }
                });
                break;
            case "error":
                set(() => ({ error: result.error, isLoading: false }));
                break;
        }
        resolve();
    }),

    decrement: async () => new Promise<void>((resolve) => {
        set(() => ({ isLoading: true }));
        setTimeout(() => {
            set((state) => ({ counters: [], isLoading: false }))
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


