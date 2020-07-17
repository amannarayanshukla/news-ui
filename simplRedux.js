
let action = {
  type : 'ADD_TODO',
  todo: {
    id: 0,
    name : 'Learn redux',
    status: 'in progress'
  }
}

const reducer = (state = [], action) => {
  if(action.type === 'ADD_TODO'){
    return state.concat([action.todo])
  }
  return state;
}

function  createStore() {
  /*
  * 1. State
  * 2. Get state
  * 3. Listening to changes in the state
  * 4. Update the state
  * */

  let state;
  let listeners = [];
  const getState = state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter(item => item !== listener);
    }
  }

  const dispatch = (action) => {
    reducer(state,action)
    listeners.map(listener => listener())
  }


  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore();

const unsubscribe = store.subscribe(() => {

})
store.subscribe(() => {

})
store.subscribe(() => {

})

store.dispatch({
  type : 'ADD_TODO',
  todo: {
    id: 0,
    name : 'Learn redux',
    status: 'in progress'
  }
})

