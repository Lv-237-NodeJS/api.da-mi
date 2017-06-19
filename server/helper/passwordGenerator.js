'use strict'

module.exports = {
  passwordGenerate() {
    const chars =
      ['qwertyuiopasdfghjklzxcvbnm', 'QWERTYUIOPASDFGHJKLZXCVBNM', '$@$!%*?&', '1234567890'];
    let password = '';
    let i;

    for (i = 0; i < 3; i++) {
      password += chars.map(char => char.charAt(Math.floor(Math.random() * char.length))).join('');
    }
    return password;
  }
};
