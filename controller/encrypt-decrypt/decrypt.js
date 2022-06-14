const bcrypt = require("bcrypt");

async function decryptPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (err) {
        reject(err);
      } else {
        resolve(isPasswordCorrect);
      }
    });
  });
}

module.exports = decryptPassword;
