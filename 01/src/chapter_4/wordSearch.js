//  В этой задаче нужно будет написать алгоритм поиска, который скажет, можно ли найти входное слово в головоломке поиска слов, которая тоже подается функции на вход.
// Данная задача имеет два уровня сложности :
// - Первый уровень включает в себя исключительно поиск по вертикали и по горизонтали
// - Второй уровень дополнительно включает в себя поиск по диагонали
// - Слова могут быть записаны слева направо и наоборот.

function searchSubString(puzzle, word) {
  for (let arr of puzzle) {
    if (arr.join("").includes(word) || arr.slice().reverse().join("").includes(word)) {
      return true;
    }
  }
  return verticalSearch(puzzle, word) || diagonalSearch(puzzle, word);
}

function verticalSearch(puzzle, word) {
  let verticalArr = [];
  for (let j = 0; j < puzzle.length; j++) {
    let joinStr = "";
    for (let i = 0; i < puzzle.length; i++) {
      joinStr += puzzle[i][j];
    }
    verticalArr.push(joinStr);
  }
  for (let elem of verticalArr) {
    if (elem.includes(word) || elem.split('').reverse().join('').includes(word)) {
      return true;
    }
  }
  return false;
}

function diagonalSearch(puzzle, word) {
  let firstSym = word[0];
  for (let  row = 0; row < puzzle.length; row++) {
    for (let col = 0; col < puzzle.length; col++) {
      let leftUpDiagonal = firstSym;
      let leftDownDiagonal = firstSym;
      let rightUpDiagonal = firstSym;
      let rightDownDiagonal = firstSym;
      if (puzzle[row][col] === firstSym) {
        for (let i = 1; i < word.length; i++) {
          if (row - i >= 0 && col - i >= 0 ) {
            leftUpDiagonal += puzzle[row - i][col - i];
          }
          if (row - i >= 0 && col + i < puzzle[row].length) {
            rightUpDiagonal += puzzle[row - i][col + i];
          }
          if (row + i < puzzle.length && col - i >= 0) {
            leftDownDiagonal += puzzle[row + i][col - i];
          }
          if (row + i < puzzle.length && col + i < puzzle[row].length) {
            rightDownDiagonal += puzzle[row + i][col + i];
          }
        }
        // console.log(leftUpDiagonal, leftDownDiagonal, rightDownDiagonal, rightUpDiagonal);
        if (leftUpDiagonal === word || leftDownDiagonal === word || rightUpDiagonal === word || rightDownDiagonal === word) {
          return true;
        }
      }
    }
  }
  return false;
}
const examplePuzzle = [
  ["b", "l", "g", "o", "l", "d", "s"], // s d l o g l b
  ["x", "k", "q", "w", "i", "j", "p"],
  ["a", "n", "w", "k", "k", "p", "n"],
  ["h", "e", "e", "e", "k", "i", "l"],
  ["q", "e", "k", "a", "y", "q", "a"],
  ["h", "u", "h", "a", "e", "a", "u"],
  ["k", "q", "j", "c", "c", "m", "r"],
];

// console.log(diagonalSearch(examplePuzzle, "aidar"));

// console.log(searchSubString(examplePuzzle, "gold"));
//
// // // Level 1
console.log(searchSubString(examplePuzzle, "like"));// true
console.log(searchSubString(examplePuzzle, "gold")); // true
console.log(searchSubString(examplePuzzle, "queen")); // true
//
// // Level 2
console.log(searchSubString(examplePuzzle, "cake")); // true


