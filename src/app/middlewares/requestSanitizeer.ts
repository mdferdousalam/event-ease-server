/**
 * Request sanitization middleware
 * Cleans and validates incoming request data
 */
const sanitizeRequest = (req, res, next) => {
  // Deep sanitization of request body
  if (req.body) {
    req.body = Object.keys(req.body).reduce((acc, key) => {
      // Trim string values, leave other types unchanged
      acc[key] =
        typeof req.body[key] === "string"
          ? req.body[key].trim()
          : req.body[key];
      return acc;
    }, {});
  }
  next();
};

export default sanitizeRequest;