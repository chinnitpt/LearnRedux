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

const {Component} = React;

let nextTodo = 0

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





const Todo = ({onClick, text, completed}) => {
  return <li  onClick={onClick} style={{textDecoration:completed?'line-through':'none'}}>
    {text}
  </li>
}

const TodoList = ({todos, onTodoClick}) => {
  return <ul>
    {todos.map(t =>
      <Todo
        key={t.id} {...t}
        onClick={ () => {onTodoClick(t.id)}}
      />
    )}
  </ul>

}

const AddTodo = ({onClick}) => {
  let input
  return <div>
    <input ref={node => {input = node}}/>
    <button
      onClick={() => {
                onClick(input.value)
                input.value = '';
            }}> Add To do
    </button>
  </div>
}

const Link = ({active, children, onClick}) => {
  if(active){
    return <span>{children}</span>
  }
  return (
    <a href="#" onClick={(e)=>{
      e.preventDefault();
      onClick()
    }}>
      {children}
    </a>)
}

class FilterLink extends Component{

  componentDidMount () {
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render(){
    const props = this.props;
    const state = store.getState()
    const visibilityFilter = state.visibilityFilter
    return  (
      <Link active={props.filter === visibilityFilter}
        onClick={()=>{
          store.dispatch({
            type:'SET_VISIBILITY_FILTER',
            filter:props.filter
          })
        }}
      >
        {props.children}
      </Link>
    )
  }
}



const Footer = () =>{
 return  <p>
    Show: {' '}
    <FilterLink filter="SHOW_ALL" >All</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE" >Active</FilterLink>{' '}
  </p>
}

const TodoApp = ({todos, visibilityFilter}) => {
  return (
    <div>
      <AddTodo
        onClick={(value) => {
          if(value){
            store.dispatch({
              id:nextTodo++,
              text:value,
              completed:false,
              type:'ADD_TODO'
            })
          }
        }}
      />

      <TodoList todos={getVisibleTodos(todos, visibilityFilter)}
                onTodoClick={(id) => (
            store.dispatch({
              type:'TOGGLE_TODO',
              id:id
            })
          )}
      />
      <Footer/>
    </div>
  );
}
const render = () => {
  ReactDOM.render( <TodoApp {...store.getState()}/>, document.getElementById('root'));
}
store.subscribe(render);
render();

