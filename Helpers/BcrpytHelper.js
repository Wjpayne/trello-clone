  
const bcrypt = require("bcrypt");
const saltRounds = 10;


const comparePassword = (plainPassword, passwordFromDB) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, passwordFromDB, function (err, result) {
      if (err) reject(err);

      resolve(result);
    });
  });
};

module.exports = {

  comparePassword,
};