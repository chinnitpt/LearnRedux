     
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


const todos = (state=[], action)=>{
  switch(action.type){
    case 'ADD_TODO':
      return [...state, todo(undefined, action)]
    case 'TOGGLE_TODO':
       return state.map(t =>todo(t, action));
    default:
      return state
  }
}

const testAddTodo = () =>{
  const stateBefore =[]
  const action = {type:'ADD_TODO', id:1, text:'hello'}
  const stateAfter = [{id:1, text:'hello', completed:false}]

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
  
}

const testToogleTodo = () => {
  const stateBefore = [
    {id:1, text:'React', completed:false}, 
    {id:2, text:'Flux', completed:true}, 
    {id:3, text:'redux', completed:true}
  ];

  const  stateAfter = [
   {id:1, text:'React', completed:false}, 
   {id:2, text:'Flux', completed:false}, 
   {id:3, text:'redux', completed:true}
  ]  

  const action = {type:'TOGGLE_TODO', id:2};

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

}



testAddTodo();
testToogleTodo();
console.log("All tests Passed");