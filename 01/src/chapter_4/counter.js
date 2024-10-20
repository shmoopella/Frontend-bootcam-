//Напишите функцию counter, которая при каждом вызове будет возвращать числа
// на 3 больше, чем в прошлый. Нельзя использовать переменные, объявленные через var!
"use strict"
function makeCounter() {
  let count = 0;
  return function() {
    count+=3;
    return count - 3;
  };
}

let counter = makeCounter();
counter(); // Функция вернет 0
counter(); // Функция вернет 3
counter(); // Функция вернет 6
counter(); // Функция вернет 9



