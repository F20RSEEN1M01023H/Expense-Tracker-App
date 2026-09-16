import { Router } from 'express';
import * as summaryController from '../controllers/summaryController.js';
import { validate } from '../middlewares/validate.js';
import { queryFiltersSchema } from '../validations/expenseValidation.js';

const router = Router();

router.get('/monthly', summaryController.getMonthlySummary);
router.get(
  '/by-category',
  validate(queryFiltersSchema, 'query'),
  summaryController.getCategorySummary,
);
router.get('/top', validate(queryFiltersSchema, 'query'), summaryController.getTopExpenses);

export default router;
