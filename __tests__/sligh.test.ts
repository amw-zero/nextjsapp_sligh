import { expect, test } from 'vitest';
  import { makeStore } from '../lib/state';
  import { Counter } from './model';
  import fc from 'fast-check';
  

interface IncrementDBState {
 value: number
}

interface IncrementDBState {
 value: number
}

interface IncrementType {
 value: number
db: IncrementDBState
}

test("Test local action refinement: Increment", async () => {
  let state = fc.record({value: fc.integer(),
db: fc.record({value: fc.integer()})})
await fc.assert(fc.asyncProperty(state, async (state: IncrementType) => {
  let model = new Counter(state.db.value);
  model.value = state.db.value;

  let store = makeStore();
  store.setState({ count: state.db.value });

  model.Increment();
  store.getState().increment();

  expect(model.value).toEqual(store.getState().count);
}))
})
