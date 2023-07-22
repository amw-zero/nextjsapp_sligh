// Property: implementation refines model
// use simulation - for every implementation action, corresponding action in model is equivalent

// Idea: compile implementation lenses based on model actions. Implementation lens will do things like fetch appropriate
// data based on target architecture. An action has to query the state that it operates on anyway, so getting it 
// all ahead of time isn't a huge performance penalty. It also encourages modularity - you only pay for what you 
// use in the specific action. It ALSO provides a free test case - the initial and final states can be logged

// function monitorAction<T>(actionState: T, action: Action, beforeState: number, afterState: number) {
//     let model = new Model();
//     model.populateState(actionState)

//     // check model matches beforeState

//     switch (action.type) {
//         case 'increment':
//             model.increment();
//     }

//     if (model.value !== afterState) {
//         // violation
//     }
// }

// class Monitor {

// }

export const x = 5;