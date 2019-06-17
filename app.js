const path = require('path');
const fs = require('fs');
const FILE = path.join(__dirname, 'data.json');

function write(filePath, data) {
  return new Promise((resolve, reject) => {
    if(!Array.isArray(data)){
      return reject('data must be an array')
    }
    //Use fs.writeFile(file, data[, options], callback)
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if(err){
        return reject(err);
      }
      resolve();
    });
  });
}

write(FILE, [{name: 'Moe'}, {name: 'Larry', age: 50}])
.then(() => console.log('success')
)
.catch( err => console.log(err)
);

// console.log(FILE);