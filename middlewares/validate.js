import ApiError from '../utils/apiError.js';

export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      return next(new ApiError(400, 'Validation Failed', errorMessages));
    }

    next();
  };
};
