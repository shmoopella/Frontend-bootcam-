const fs = require("fs");
const ProgressBar = require('console-progress-bar');
const progressbar = async () => {
  let files = await new Promise(function (resolve, reject) {
    fs.readdir('files/fsHard', (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });

  let res = await Promise.all(files.map(file => {
    return new Promise(function (resolve, reject) {
      fs.stat('files/fsHard/' + file, (error, stats) => {
        if (error) {
          reject(error);
        } else {
          resolve(stats);
        }
      });
    });
  }));
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  let sizesArr = res.map(value=> value.size);
  let sizeAllFiles = res.reduce((sum, current) => sum + current.size, 0);

  const progressBar = new ProgressBar({maxValue: 100});
  for (const value of sizesArr) {
    let currentPercentage = +(100 * (value / sizeAllFiles)).toFixed(1);
    progressBar.addValue(currentPercentage);
    await sleep(1000); // Задержка в 1 секунду для каждого файла, чтобы было заметно постепенное изменение статус-бара
  }
  return res;
};

progressbar();
