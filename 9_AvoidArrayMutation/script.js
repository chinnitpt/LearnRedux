const addCount = (list) => {
  
  return [...list, 0];
};

const removeCounter = (list, index)=>{
  return [
    ...list.slice(0,  index), 
    ...list.slice(index+1)
  ]
};

const testAddCount = (list) => {
  const listBefore = [];
  const listAfter = [0];
 
  deepFreeze(listBefore);
 
  expect(
    addCount(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () =>{
  const listBefore = [12,45,23,45];
  const listAfter = [12,45,45];
  
  deepFreeze(listBefore);
  deepFreeze(listAfter);
  
  expect(
    removeCounter(listBefore,2)
  ).toEqual(listAfter);
}
testAddCount();
testRemoveCounter();
console.log('All tests are passed');