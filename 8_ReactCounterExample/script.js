const counter = (state = 0, action) => {
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state -1;
    default:
      return state
  }
};
// Store binds together the three principles of redux
const {createStore} = Redux;
const store = createStore(counter);

const Counter = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = ()=>{
  ReactDOM.render(
    <Counter value={store.getState()}
             onIncrement={() => {store.dispatch({type:'INCREMENT'})}}
             onDecrement={() => {store.dispatch({type:'DECREMENT'})}}
    />,
    document.getElementById('root'));
};

store.dispatch({type:'INCREMENT'});
render();

store.subscribe(render);
render();
