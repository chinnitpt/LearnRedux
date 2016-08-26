const toggleToDo = (todo)=>{
  return Object.assign({}, todo,{completed:!todo.completed})
}

const testToggleToDo = () => {
  const todoBefore= {id:1, text:'hello', completed:true};
  const todoAfter= {id:1, text:'hello', completed:false};

  deepFreeze(todoBefore)

  expect(
    toggleToDo(todoBefore)
  ).toEqual(todoAfter);
}

testToggleToDo();
console.log("All Tests Passed");