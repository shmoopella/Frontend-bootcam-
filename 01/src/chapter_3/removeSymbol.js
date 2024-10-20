// Функция на вход принимает две строки - сообщение (обычная строка с текстом) и символ который надо удалить из этого сообщения.

function removeString(message, symbol) {
  let res_str = message;
  let pos = 0;
  while ((pos = res_str.indexOf(symbol, 0)) !== -1) {
    res_str = res_str.slice(0, pos) + res_str.slice(pos + 1);
  }
  return res_str;
}

// function removeString(message, symbol) {
//   let res_str = "";
//   for (let char of message) {
//     if (char !== symbol) {
//       res_str = res_str + char;
//     }
//   }
//   return res_str;
// }



removeString("Большое и интересное сообщение", "о"); // Бльше и интересне сбщение

