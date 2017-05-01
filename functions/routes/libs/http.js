exports.methodNotAllowed = function(req, res) {
  return res.status(405).json({success:false, message:'Method Not Allowed'});
};

exports.unauthorized = function(req, res) {
  return res.status(401).json({success:false, message:'Unauthorized'});
};

exports.permissionDenied = function(req, res) {
  return res.status(403).json({success:false, message:'Permission Denied'});
};

exports.notFound = function(req, res) {
  return res.status(404).json({success:false, message:'Not Found'});
};

exports.badRequest = function(req, res, msg) {
  var msg = typeof msg !== 'undefined' ? msg : '';
  return res.status(400).json({success:false, message:'Bad Request. '+msg});
};

exports.internalServerError = function(req, res, error) {
  return res.status(500).json({success:false, message:error});
}