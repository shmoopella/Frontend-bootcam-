// Напишите функицю, которая принимает индекс числа из ряда Фибоначчи и возвращает его значение.
// Предположим, что ряд Фибоначчи начинается с 0 индекса.


function fibo(index) {
  if (index === 0) {
    return 0;
  } else if (index === 1) {
    return 1;
  } else {
    return fibo( index - 1) + fibo(index - 2);
  }
}

fibo(5); // Вернет 5
