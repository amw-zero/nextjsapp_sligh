import { expect, test } from 'vitest'
import { store, makeStore, ClientState, Server } from '../lib/state';
import { Counter } from '../lib/model';
import { StoreApi } from 'zustand/vanilla';
import fc from 'fast-check'

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


// Problems:
// 
// 1. Need Impl instance and class to create new instances
// 2. Need model class
// 3. need to import witness, so generate it to a specific file.

class Test {
    constructor(x: number){
        
    }
}

type Type =
 | 'Int'
 | 'Generic'

type TypedAttribute = {
    name: string;
    type: Type
}

type ActionSignature = {
    args: TypedAttribute[];
    returnValue: Type    
}

type Action = {
    name: string;
    signature: ActionSignature;
}

type Process = {
    name: string;
    actions: Action[];
}

type Witness = {
    processes: Process[]
}

/*

function makeCommandsFromWitness(): fc.AsyncCommand<Counter, StoreApi<ClientState>[] {
//    return 
}

// btw this is dependent on: Impl type, Model type, target language, PBT library, test runner.
// Concern: Combinatorial explosion of dependencies, M x N problem.
async function CheckImplementationRefinesModel(witness: Witness, clientCreator: () => StoreApi<ClientState>, implInvariant: (impl: ClientState) => boolean) {
    witness.processes.forEach((process) => {

    })
    await fc.assert(
        fc.asyncProperty(fc.commands(allCommands, { size: "small" }), async (cmds) => {
            let model = new Counter();
            let client = clientCreator();
//            await client.setupServer();

            const env = () => ({ model, real: client });
            await fc.asyncModelRun(env, cmds);

            const state = client.getState();
            expect(implInvariant(state)).toBeTruthy();
            expect(client).toEqual(model);

//            await client.teardownServer();
        })
    );
}

type CounterClientState = {
    value: number;
}

Trace:

- Initial:   value = 0    (db = 0)
- Increment: value = 1    (db = 1)
- Increment: value = 2    (db = 1), // DB write fails
- Increment: value = 2    (db = 2)

Non-deterministic -
   sometimes, Increment @ value = 2 leads to value = 3,
   sometimes it leads to value = 2. Doesn't conform to model:

class Counter {
    value: number = 0;

    increment() {
        this.value += 1;
    }
}   

With a simulation test, this would result in a failure for:

Init: value = 2
- Increment. 

Model would equal 3, impl would equal 2.

The only real solution to this is to add additional state:

type CounterSystem = {
    client: number;
    db: number;
}

First of all, single-action tests can now create and check for this state:

- Initial: client = 2, db = 1

Traces now expose this state, and a property can be created about it:

- Initial: client = 0, db = 0
- Increment: client = 1, db = 1
- Increment: client = 2, db = 1  // DB write fails

"Client and db must be equal after action completes, unless there is an implementation-level error"

This is now risky, because this means that a trace in which all actions result in a DB error are technically correct.

This is _vacuously_ true. One solution is just to add a check for vacuous truth, via a history variable captured between actions:


let nonErrExecs = 0;

type CounterSystem = {
    client: number;
    db: number;
}

- Initial: client = 1, db = 1
- Increment: client = 2, db = 1, error = 'db error', nonErrExecs = 0

After a run of thousands of tests, we can even check for the percentage or errors:

let numChecks = 0
let healthPercentage = nonErrExecs / numChecks

We can require that there be ~99% health during a test.




type DBState = { 
  recurring_transactions: RecurringTransaction[] 
}

Regarding the state type. The client can be considered a cache,  so actually this could be reverse
type DeleteRecurringTransactionState = {
    recurringTransactions: RecurringTransaction[];
    id: number;

    isLoading: boolean;

    infrastructure: {
        db: {
            recurringTransactions: RecurringTransaction[];
        }
    }
}

Regarding the state type. The client can be considered a cache,  so actually this could be reversed:

type DeleteRecurringTransactionState = {
    // database state
    recurringTransactions: RecurringTransaction[];
    id: number;
    error: string;

    isLoading: boolean;

    client: {
        recurringTransactions: RecurringTransaction[];
    }
}

function refinementMapping(impl: DeleteRecurringTransactionState) Counter {
    return {
        recurringTransactions: impl.recurringTransactions
        error: impl.error;
    }
}

This solidifies the idea of: "Web applications are caching memory systems."

Not sure if this is flexible enough though. What about microservices where each service can cache data from other services?
Could just give up and say this is the reponsibility of the backend? Or what if we have redis too? Redis can be another cache.

Could do something like cache definitions, i.e. on annotate each action with:

cache: [AppDB, Redis]


exec:

{
    recurringTransactions: [1,2],
    isLoading = false;
    id: 1;

    infrastructure: {
        db: {
            recurringTransactions: [1,2];
        }
    }
}

{
    recurringTransactions: [1,2],
    isLoading = true;
    id: 1;

    infrastructure: {
        db: {
            recurringTransactions: [1,2];
        }
    }
}
-----------
error:

{
    recurringTransactions: [1,2],
    isLoading = false;
    id: 1;

    infrastructure: {
        db: {
            error: "malformed SQL"
            recurringTransactions: [1,2];
        }
    }
}

success:

{
    recurringTransactions: [2],
    isLoading = false;
    id: 1;

    error: string;

    infrastructure: {
        db: {
            error: string;
            recurringTransactions: [2];
        }
    }
}

test('Check increment action', async () => {
    let state = 5 // <generate action state>;
    await fc.assert(
        fc.asyncProperty(state, async (state: DeleteRecurringTransactionState) => {
            const store = makeStore();
            // 1. Initialize client and model
            // Create client
            // create model
            // set initial states on client and model
            // use distributed state protocol to set infrastructure state.

            // 2. Perform action

            // 3. Assert equivalent result states
            // this requires using distributed state protocol to retrieve infrastructure state.

            // 4. Optionally assert any invariants
        
        });
    );
})

*/

test('Check increment action', async () => {
    let state = {value: fc.integer(),
        db: fc.custom()
    }
    await fc.assert(
        fc.asyncProperty(state, async (state: DeleteRecurringTransactionState) => {
            const store = makeStore();
            // 1. Initialize client and model
            // Create client
            // create model
            // set initial states on client and model
            // use distributed state protocol to set infrastructure state.

            // 2. Perform action

            // 3. Assert equivalent result states
            // this requires using distributed state protocol to retrieve infrastructure state.

            // 4. Optionally assert any invariants
        
        });
    );
})



// function generateTests() {
//     test('gen1', () => {
//         expect(5).toEqual(5);
//     })

//     test('gen2', () => {
//         expect(false).toBeTruthy();
//     })
// }

// generateTests();