import { expect, test } from 'vitest'
import { store } from '../lib/state';

test('incrementing store', async () => {
    const { getState } = store;
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