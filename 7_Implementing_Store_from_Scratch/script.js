const counter = (state = 0, action) => {
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state -1;
    default:
      return state
  }
}
// Store binds together the three principles of redux

const createStore = (reducer) =>{
  let state
  let listeners = []
  
  dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener)=>{listener()})
  }
  
  getState = () => (state)
  
  
  subscribe = (cb) => {
    listeners.push(cb)
  }
  dispatch({})
  return {getState, subscribe, dispatch}
}

const store = createStore(counter);

const render = () =>{
  document.body.innerText = store.getState();
}

store.dispatch({type:'INCREMENT'});
render();

store.subscribe(render)
render();
document.addEventListener('click', () =>{
  store.dispatch({type:'INCREMENT'})

})