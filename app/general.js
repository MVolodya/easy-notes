const _    = global;
const fs   = _.require('fs');
const path = _.require('path');


export const readFile = (filePath, callback) => {
  const file = path.join(_.__dirname + filePath);

  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw err;

    if (typeof callback == 'function') {
      callback(data);
    }
  });
};

export const writeFile = (filePath, data, callback) => {
  const file = path.join(_.__dirname + filePath);

  fs.writeFile(file, data, (err) => {
    if (err) throw err;

    if (typeof callback == 'function') {
      callback();
    }
  });
};

export const readDir = (filePath, callback) => {
  const file = path.join(_.__dirname + filePath);

  fs.readdir(file, (err, data) => {
    if (err) throw err;

    if (typeof callback == 'function') {
      callback(data);
    }
  });
};
