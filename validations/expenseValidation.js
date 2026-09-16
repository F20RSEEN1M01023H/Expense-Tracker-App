import Joi from 'joi';

export const createExpenseSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be a positive number',
    'any.required': 'Amount is required',
  }),
  category: Joi.string()
    .valid('food', 'transport', 'bills', 'shopping', 'other')
    .required()
    .messages({
      'any.only': 'Category must be one of: food, transport, bills, shopping, other',
    }),
  note: Joi.string().trim().max(200).optional(),
  date: Joi.date().iso().optional(),
});

export const queryFiltersSchema = Joi.object({
  month: Joi.string()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
    .messages({
      'string.pattern.base': 'Month must be in YYYY-MM format',
    })
    .optional(),
  category: Joi.string().valid('food', 'transport', 'bills', 'shopping', 'other').optional(),
  from: Joi.date().iso().optional(),
  to: Joi.date().iso().optional(),
});
