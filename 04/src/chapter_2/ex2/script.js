let input = "";
let result = document.querySelector('.item-result');

let zero = document.querySelector('.item0');
let one = document.querySelector('.item1');
let two = document.querySelector('.item2');
let three = document.querySelector('.item3');
let four = document.querySelector('.item4');
let five = document.querySelector('.item5');
let six = document.querySelector('.item6');
let seven = document.querySelector('.item7');
let eight = document.querySelector('.item8');
let nine = document.querySelector('.item9');
let dot = document.querySelector('.item-dot');
let del = document.querySelector('.item-delete');
let plus = document.querySelector('.item-plus');
let minus = document.querySelector('.item-minus');
let divide =  document.querySelector('.item-divide');
let mult = document.querySelector('.item-mult');
let equal = document.querySelector('.item-equal');



zero.addEventListener("click", () => showInput('0'));
one.addEventListener("click", () => showInput('1'));
two.addEventListener("click", () => showInput('2'));
three.addEventListener("click", () => showInput('3'));
four.addEventListener("click", () => showInput('4'));
five.addEventListener("click", () => showInput('5'));
six.addEventListener("click", () => showInput('6'));
seven.addEventListener("click", () => showInput('7'));
eight.addEventListener("click", () => showInput('8'));
nine.addEventListener("click", () => showInput('9'));

dot.addEventListener("click", () => showInput('.'));
del.addEventListener("click", deleteHandler);
plus.addEventListener("click", () => showInput('+'));
minus.addEventListener("click", () => showInput('-'));
divide.addEventListener("click", () => showInput('/'));
mult.addEventListener("click", () => showInput('*'));
equal.addEventListener("click", equalHandler);

function equalHandler() {
  try {
    let computedResult = math.evaluate(input);
    input = "";
    result.innerHTML = computedResult;
  } catch (error) {
    result.innerHTML = 'Input error!';
    input = "";
  }
}

function deleteHandler() {
  input = '';
  result.innerHTML = input;
}

function showInput(value) {
  input += value;
  result.innerHTML = input;
}
