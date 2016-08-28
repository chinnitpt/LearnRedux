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

const {Component} = React;

let nextTodo = 0


const AddTodo = (props, {store}) => {
  let input
  return <div>
    <input ref={node => {input = node}}/>
    <button
      onClick={() => {if(input.value){
                store.dispatch({
                  type:'ADD_TODO',
                  text:input.value,
                  id:nextTodo++,
                  completed:false
                })
                input.value = '';
            }}}> Add To do
    </button>
  </div>
}
AddTodo.contextTypes = {
  store: React.PropTypes.object
}


class VisibleTodoList extends Component{
  componentDidMount () {
    this.unsubscribe = this.context.store.subscribe(()=>{
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const {store} = this.context;
    const state = store.getState()

    return(
      <TodoList todos={getVisibleTodos(state.todos, state.visibilityFilter)}
          onTodoClick = {(id) => {
            store.dispatch({
              type:'TOGGLE_TODO',
              id: id
            })
        }}
      />
    )
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
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

const Todo = ({onClick, text, completed}) => {
  return <li  onClick={onClick} style={{textDecoration:completed?'line-through':'none'}}>
    {text}
  </li>
}

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

const Footer = () =>{
  return  <p>
    Show: {' '}
    <FilterLink filter="SHOW_ALL" >All</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE" >Active</FilterLink>{' '}
  </p>
}

class FilterLink extends Component{

  componentDidMount () {
    this.unsubscribe = this.context.store.subscribe(()=>{
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render(){
    const props = this.props;
    const {store} = this.context;
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
FilterLink.contextTypes = {
  store: React.PropTypes.object
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




const TodoApp = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );
}

const {createStore} = Redux;
const {Provider} = ReactRedux;

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>, document.getElementById('root'));


