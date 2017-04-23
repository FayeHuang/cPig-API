exports.methodNotAllowed = function(req, res) {
  return res.send('Method Not Allowed', 405);
};

exports.unauthorized = function(req, res) {
  return res.send('Unauthorized', 401);
};

exports.permissionDenied = function(req, res) {
  return res.send('Permission Denied', 403);
};

exports.notFound = function(req, res) {
  return res.send('Not Found', 404);
};

exports.internalServerError = function(req, res, error) {
  return res.send(error, 500);
}