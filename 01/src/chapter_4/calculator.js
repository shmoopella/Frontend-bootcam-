// Вам надо набор функций который будет симулировать работу калькулятора.
// Для этого вам надо написать 9 функций, которые могут принимать в качестве аргумента другую функцию,
// если функция передана, то надо вернуть вызов функции с числом n, иначе вернуть число n.
// Например, функция one может принять в качестве аргумента функцию sum, тогда в return будет sum(1).
// Если же в функцию не передали ничего, то она просто вернет 1.
// Также надо написать 4 функции основных арифмитических операторов,
// которые принимают в качестве аргумента первое число, а возвращают функцию,
// которая принимает в качестве аргумента второе число и возвращает их сумму/разность/частое/произведение.

function one(callback) {
  if (callback === undefined) {
    return 1;
  } else {
    return callback(1);
  }
}
function two(callback) {
  if (callback === undefined) {
    return 2;
  } else {
    return callback(2);
  }
}
function three(callback) {
  if (callback === undefined) {
    return 3;
  } else {
    return callback(3);
  }
}
function four(callback) {
  if (callback === undefined) {
    return 4;
  } else {
    return callback(4);
  }
}
function five(callback) {
  if (callback === undefined) {
    return 5;
  } else {
    return callback(5);
  }
}
function six(callback) {
  if (callback === undefined) {
    return 6;
  } else {
    return callback(6);
  }
}
function seven(callback) {
  if (callback === undefined) {
    return 7;
  } else {
    return callback(7);
  }
}
function eight(callback) {
  if (callback === undefined) {
    return 8;
  } else {
    return callback(8);
  }
}
function nine(callback) {
  if (callback === undefined) {
    return 9;
  } else {
    return callback(9);
  }
}

function plus(a) {
  return function(b) {
    return a + b;
  }
}

function minus(a) {
  return (b) => a - b;
}

function divide(a) {
  return (b) => a / b;
}

function mult(a) {
  return (b) => a * b;
}

one(mult(three(plus(four()))));
