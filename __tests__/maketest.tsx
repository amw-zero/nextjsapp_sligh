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
    test(`Test local action simulation: ${actionName}`, async () => {
      let impl: StoreApi<ClientState>;
  
      await fc.assert(fc.asyncProperty(stateGen, async (state) => {
        impl = makeStore();        
  
        const clientState = implSetup(state);
        impl.setState(clientState);

        await impl.getState().setDBState(dbSetup(state));
        await runImpl(impl.getState(), state);

        switch (stateType) {
          case "write": {
            const clientModelResult = model(clientModelArg(state));
            for (const expectation of expectations) {
              const { modelExpectation, implExpectation } = expectation(clientModelResult, impl.getState());
    
              expect(implExpectation).toEqual(modelExpectation);
            }
            break;
          }
          case "read": {
            let modelResult = model(modelArg(state));
            for (const expectation of expectations) {
              const { modelExpectation, implExpectation } = expectation(modelResult, impl.getState());
    
              expect(implExpectation).toEqual(modelExpectation);
            }
            break;
          }
        }
      }).afterEach(async () => {
        await impl.getState().teardownDBState();
      }), { endOnFailure: true, numRuns: 25 });
    });
  }

