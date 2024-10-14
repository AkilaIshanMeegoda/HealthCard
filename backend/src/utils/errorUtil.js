const handleErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ message });
  };
  
  module.exports = {
    handleErrorResponse,
  };
  