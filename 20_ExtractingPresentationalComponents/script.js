const todo = (state, action) => {
  switch(action.type){
    case 'ADD_TODO':
      return {id:action.id, text:action.text, completed:false}
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state
      }
      return{
        ...state,
        completed : !state.completed

      };
    default:
      return state
  }
}



const todos = (state=[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [...state, todo(undefined, action)]
    case 'TOGGLE_TODO':
      return state.map(t =>todo(t, action));
    default:
      return state
  }
}


const visibilityFilter = (state="SHOW_ALL", action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const {combineReducers}  = Redux;

const todoApp = combineReducers({todos, visibilityFilter})

const {createStore} = Redux;

const store = createStore(todoApp);


let nextTodo = 0

const {Component}  = React



const getVisibleTodos = (todos, filter) => {
  switch(filter){
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t=>t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t=>!t.completed);
  }
}



const FilterLink = ({filter, children}) => (
  <a href="#" onClick={(e)=>{
      e.preventDefault();
      store.dispatch({type:'SET_VISIBILITY_FILTER', filter});
    }}>
    {children}
  </a>
)

const Todo = ({onClick, text, completed}) =>{
  return <li  onClick={onClick} style={{textDecoration:completed?'line-through':'none'}}>
    {text}
  </li>
}

const TodoList = ({todos, onClick}) =>{
  return todos.map(t =>(<Todo  key={t.id} {...t}  onClick={onClick(t.id)}/>))
}


class TodoApp extends Component {

  render() {
    const visibleTodos = getVisibleTodos(this.props.todos, this.props.visibilityFilter)
    return (
      <div>
        <input ref={node => {this.input = node}}/>
        <button
          onClick={() => {
                store.dispatch({
                  type:'ADD_TODO',
                  text:this.input.value,
                  id:nextTodo++
                });
                this.input.value = '';
            }}> Add To do
        </button>
        <ul>
          <TodoList todos={visibleTodos}
            onClick={(id) => (
              store.dispatch({
                type:'TOGGLE_TODO',
                id:id
              })
            )} />
        </ul>
        <p>
          Show: {' '}
          <FilterLink filter="SHOW_ALL">All</FilterLink>{', '}
          <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>{', '}
          <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{', '}

        </p>
      </div>
    );
  }
}
const render = () => {
  ReactDOM.render( <TodoApp {...store.getState()}/>, document.getElementById('root'));
}
store.subscribe(render);
render();

