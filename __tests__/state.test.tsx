import { expect, test } from 'vitest'
import { store } from '../lib/state';

test('incrementing store', () => {
    const { getState } = store;
    let state = getState();

    expect(
        state.count,
    ).toEqual(0);

    state.increment();

    state = getState();
    expect(
        state.count,
    ).toEqual(1);
});