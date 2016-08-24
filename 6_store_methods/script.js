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
const {createStore} = Redux;
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