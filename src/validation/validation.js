const joi = require('joi')
exports.validateRequest = (schema, property = 'body') => {
return (req, res, next) => {
    console.log(schema,property);
    
    const { error, value } = schema.validate(req[property]);
    

    // If validation passes, replace req[property] with validated value
    // This ensures type coercion and default values are applied
    if (!error) {
      req[property] = value;
      return next();
    }

    // Format errors for consistent API responses
    const errorDetails = error.details.map(detail => ({
      path: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: errorDetails
    });
  };
};


exports.validateParams = (schema) => (req, res, next) => {
    try {
      // .parse() validates and replaces req.params with the coerced/parsed object
      req.params = schema.validate(req.params);
      next();
    } catch (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.message,
        errors: error.errors // Array of specific validation errors
      });
    }
  };