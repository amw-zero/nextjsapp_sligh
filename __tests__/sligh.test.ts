import { expect, test } from 'vitest';
  import { makeStore } from '../lib/state';
  import { Counter } from './model';
  import fc from 'fast-check';
  

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
  let model = new Counter(state.value)
let impl = makeStore()
impl.setState({value: state.value})
model.Increment()
let implState = impl.getState()
await implState.Increment()

  console.log({modelValue: model.value, implValue: impl.getState().value});

expect(model.value).toEqual(impl.getState().value)
}), { numRuns: 10 })
})
