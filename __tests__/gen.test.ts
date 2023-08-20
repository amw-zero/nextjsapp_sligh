import { makeTest } from './maketest';
import { witness } from './witness';

for (const testCase of witness) {
    makeTest(
      testCase.name, 
      testCase.type as "read" | "write",
      testCase.stateGen, 
      testCase.implSetup, 
      testCase.dbSetup, 
      testCase.model, 
      testCase.modelArg, 
      testCase.clientModelArg,
      testCase.runImpl, 
      testCase.expectations
    );
  }