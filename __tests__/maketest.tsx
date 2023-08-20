import { expect, test } from 'vitest';
import { makeStore, ClientState } from '../lib/state';
import fc from 'fast-check';
import { StoreApi } from 'zustand/vanilla';
  
export function makeTest(
    actionName: string,
    stateType: "read" | "write",
    stateGen: any,
    implSetup: any,
    dbSetup: any,
    model: any,
    modelArg: any,
    clientModelArg: any,
    runImpl: any,
    expectations: any,
  ) {
    test(`Test local action refinement: ${actionName}`, async () => {
      let impl: StoreApi<ClientState>;
  
      await fc.assert(fc.asyncProperty(stateGen, async (state) => {
        console.log(`\n\n|============== Test frame: ${actionName} =============|`);

        console.log("|-- start state: ", JSON.stringify(state, null, 4));
        impl = makeStore();        
  
        const clientState = implSetup(state);
        impl.setState(clientState);

        await impl.getState().setDBState(dbSetup(state));
        
        await runImpl(impl.getState(), state);
        console.log("Impl result: ", JSON.stringify(impl.getState(), null, 4))

        switch (stateType) {
          case "write": {
            const clientModelResult = model(clientModelArg(state));
            console.log("Client model result ", JSON.stringify(clientModelResult, null, 4));
            for (const expectation of expectations) {
              const { modelExpectation, implExpectation } = expectation(clientModelResult, impl.getState());
    
              expect(implExpectation).toEqual(modelExpectation);
            }
            break;
          }
          case "read": {
            let modelResult = model(modelArg(state));
            console.log("Model result ", JSON.stringify(modelResult, null, 4));
            for (const expectation of expectations) {
              const { modelExpectation, implExpectation } = expectation(modelResult, impl.getState());
    
              expect(implExpectation).toEqual(modelExpectation);
            }
            break;
          }
        }
      }).afterEach(async () => {
        await impl.getState().teardownDBState();
      }), { endOnFailure: true, numRuns: 1 });
    });
  }

