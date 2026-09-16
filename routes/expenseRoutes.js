import { Router } from 'express';
import * as expenseController from '../controllers/expenseController.js';
import { validate } from '../middlewares/validate.js';
import { createExpenseSchema, queryFiltersSchema } from '../validations/expenseValidation.js';

const router = Router();

router
  .route('/')
  .post(validate(createExpenseSchema, 'body'), expenseController.createExpense)
  .get(validate(queryFiltersSchema, 'query'), expenseController.getExpenses);

router.route('/:id').get(expenseController.getExpenseById).delete(expenseController.deleteExpense);

export default router;
