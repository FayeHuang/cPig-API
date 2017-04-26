exports.methodNotAllowed = function(req, res) {
  return res.status(405).send('Method Not Allowed');
};

exports.unauthorized = function(req, res) {
  return res.status(401).send('Unauthorized');
};

exports.permissionDenied = function(req, res) {
  return res.status(403).send('Permission Denied');
};

exports.notFound = function(req, res) {
  return res.status(404).send('Not Found');
};

exports.badRequest = function(req, res) {
  return res.status(400).send('Bad Request');
};

exports.internalServerError = function(req, res, error) {
  return res.status(500).send(error);
}