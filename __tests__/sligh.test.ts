import { expect, test } from 'vitest';
  import { makeStore } from '../lib/state';
  import { Counter } from './model';
  import fc from 'fast-check';
  

interface Counter {
 name: string
value: number
}

interface CreateDBState {
 counters: Set<Counter>
}

interface GetDBState {
 counters: Set<Counter>
}

interface IncrementDBState {
 counters: Set<Counter>
}

interface GetType {
 counters: Set<Counter>
db: GetDBState
}

interface CreateType {
 counters: Set<Counter>
counter: Counter
db: CreateDBState
}

interface IncrementType {
 counters: Set<Counter>
name: string
db: IncrementDBState
}

test("Test local action refinement: Get", async () => {
  let state = fc.record({counters: fc.generic(),
db: fc.record({counters: fc.generic()})})
await fc.assert(fc.asyncProperty(state, async (state: GetType) => {
  let model = new Counter(state.db.counters)
let impl = makeStore()
impl.setState({counters: state.counters})
model.Get()
let implState = impl.getState()
await implState.Get()
expect(model.counters).toEqual(impl.getState().counters)
}))
})

test("Test local action refinement: Create", async () => {
  let state = fc.record({counters: fc.generic(),
counter: fc.record({name: fc.string(),
value: fc.integer()}),
db: fc.record({counters: fc.generic()})})
await fc.assert(fc.asyncProperty(state, async (state: CreateType) => {
  let model = new Counter(state.db.counters)
let impl = makeStore()
impl.setState({counters: state.counters})
model.Create(state.counter)
let implState = impl.getState()
await implState.Create(state.counter)
expect(model.counters).toEqual(impl.getState().counters)
}))
})

test("Test local action refinement: Increment", async () => {
  let state = fc.record({counters: fc.generic(),
name: fc.string(),
db: fc.record({counters: fc.generic()})})
await fc.assert(fc.asyncProperty(state, async (state: IncrementType) => {
  let model = new Counter(state.db.counters)
let impl = makeStore()
impl.setState({counters: state.counters})
model.Increment(state.name)
let implState = impl.getState()
await implState.Increment(state.name)
expect(model.counters).toEqual(impl.getState().counters)
}))
})
