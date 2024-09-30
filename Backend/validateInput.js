const Joi = require('joi');

function validateInput(schema, data) {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message); // Will be caught by the error handler
  }
  return value;
}

module.exports = validateInput;
