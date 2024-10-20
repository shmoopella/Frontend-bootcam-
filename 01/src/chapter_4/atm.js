// Напишите функцию банкомат которая принимает на вход число и возвращает объект в формате: {номинал_купюры : количество_купюр}.
// Если банкомат не может выдать данную сумму, то выводится ошибка 'Incorrect value'.
// Купюры должны выдаться оптимальным образом (вместо 5 купюр номиналом 1000 выдается одна 5000).
// За раз банкомат может выдавать не более 20 купюр, если купюр для выдачи не хватает то выводится ошибка 'Limit exceeded'
//
function atm(sum) {
  if (sum % 50 || sum <= 0) {
    console.log("Incorrect value!");
    return;
  }
  const banknotes = [5000, 2000, 1000, 500, 200, 100, 50];
  let result = {};
  let fullCountBanknotes = 0;
  for (let nominal of banknotes) {
    let countBanknotes = 0;
    while (sum >= nominal) {
      countBanknotes = Math.trunc(sum / nominal);
      sum = sum % nominal;
      fullCountBanknotes += countBanknotes;
      if (fullCountBanknotes > 20) {
        console.log("Limit exceeded!");
        return;
      }
      result[nominal] = countBanknotes;
    }
  }
  return result;
}

atm(8350); // {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }
atm(2570); // Incorrect value
atm(100050); // Limit exceeded
