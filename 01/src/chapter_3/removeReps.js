// Вам нужно написать функцию которая принимает в качестве аргумента массив чисел и удаляет все повторяющиеся значения.
function removeReps(array) {
  let result = [];
  let find_index;
  for (let i = 0; i < array.length; i++) {
      find_index = array.indexOf(array[i]);
      if (find_index === -1 || find_index === i) {
        result.push(array[i]);
      }
  }
  return result;
}

function removeReps(array) {
  let result = [];
  let find_index;
  let i = 0;
  while (i < array.length) {
    find_index = array.indexOf(array[i]);
    if (find_index === -1 || find_index === i) {
      result.push(array[i]);
    }
    i++;
  }
  return result;
}


removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11]); // [1,2,4,5,6,8,9,11]
