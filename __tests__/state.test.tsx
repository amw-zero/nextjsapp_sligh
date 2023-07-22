import { expect, test } from 'vitest'
import { store, ClientState, Server } from '../lib/state';
import { StoreApi } from 'zustand/vanilla';

class TestApplication {
    server: Server = new Server();
    client: StoreApi<ClientState>;

    constructor(client: StoreApi<ClientState>) {
        this.client = client;
    }
}

test('incrementing store', async () => {
    const app = new TestApplication(store);

    const { getState } = app.client;
    let state = getState();

    expect(
        state.count,
    ).toEqual(0);

    await state.increment();

    state = getState();
    expect(
        state.count,
    ).toEqual(1);
});