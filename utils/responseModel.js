const Response = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    data,
    message,
  });
};

export default Response;
