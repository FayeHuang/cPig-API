var randomstring = require("randomstring");

module.exports = function(){
  return randomstring.generate({
    length: 16,
    charset: 'alphanumeric'
  });
};