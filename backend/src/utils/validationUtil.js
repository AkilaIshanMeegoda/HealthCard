const mongoose = require('mongoose');

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const validateRequiredFields = (fields, body) => {
  const missingFields = fields.filter((field) => !body[field]);
  return missingFields.length === 0 ? null : missingFields;
};

module.exports = {
  isValidObjectId,
  validateRequiredFields,
};
