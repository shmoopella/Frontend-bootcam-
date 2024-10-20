const fs = require("fs");

const readAndWriteCallbackHell = (pathToReadFile, pathToWriteFile) => {
  fs.readFile(pathToReadFile, function(error, data) {
    if (error) {
      return console.log(error);
    } else {
      fs.writeFile(pathToWriteFile, data, function(error) {
        if (error) {
          return console.log(error);
        }
      })
    }
  })
};

const readAndWritePromises = (pathToReadFile, pathToWriteFile) => {
  let promise = new Promise(function (resolve,reject) {
    fs.readFile(pathToReadFile, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

  promise.then(function(result) {
    fs.writeFile(pathToWriteFile, result, function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
};

const readAndWriteAsyncAwait = async (pathToReadFile, pathToWriteFile) => {
  let promise = new Promise(function (resolve,reject) {
    fs.readFile(pathToReadFile, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  let result = await promise;
  fs.writeFile(pathToWriteFile, result, error => {
    if(error) {
      console.log(error);
    }
  });
};


// readAndWriteCallbackHell('files/fsSimple/file1.txt', 'files/fsSimple/file2.txt');
// readAndWritePromises('files/fsSimple/file1.txt', 'files/fsSimple/file2.txt');
// readAndWriteAsyncAwait('files/fsSimple/file1.txt', 'files/fsSimple/file2.txt');
