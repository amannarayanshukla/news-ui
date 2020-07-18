
let action_1 = {
  type : 'ADD_TODO',
  todo: {
    id: 0,
    name : 'Learn redux',
    status: 'in progress'
  }
}

let action_2 = {
  type: 'REMOVE_TODO',
  todo: 0
}

let action_3 = {
  type:'TOGGLE_TODO',
  todo: 0
}

let action_4 = {
  type:'UPDATE',
  todo:0
}

//  it reduces the state and action and gives us one state
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
    state = reducer(state,action)
    listeners.forEach(listener => listener())
  }


  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore();

const unsubscribe = store.subscribe(() => {
  console.log(`This is the state ${store.getState()}`)
})

store.dispatch({
  type : 'ADD_TODO',
  todo: {
    id: 0,
    name : 'Learn redux',
    status: 'in progress'
  }
})

