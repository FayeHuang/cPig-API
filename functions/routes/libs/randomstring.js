var randomstring = require("randomstring");

exports.uuid = () => {
  return randomstring.generate({
    length: 16,
    charset: 'alphanumeric'
  });
};

exports.sn = () => {
  return randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
};

exports.code = () => {
  return randomstring.generate({
    length: 6,
    charset: 'alphanumeric'
  });
};