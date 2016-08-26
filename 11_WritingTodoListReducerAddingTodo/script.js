const todos = (state=[], action)=>{
  switch(action.type){
    case 'ADD_TODO':
      return [...state, {id:action.id, text:action.text, completed:false}]
    default:
      return state
  }
}

const testTodo = () =>{
  const stateBefore =[]
  const action = {type:'ADD_TODO', id:1, text:'hello'}
  const stateAfter = [{id:1, text:'hello', completed:false}]

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
  
}
testTodo();
console.log("All tests Passed");