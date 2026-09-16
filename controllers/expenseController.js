import * as expenseService from '../services/expenseService.js';
import Response from '../utils/responseModel.js';

export const createExpense = async (req, res, next) => {
  try {
    const expense = await expenseService.createExpense(req.body);
    return Response(res, 201, true, 'Expense created successfully', expense);
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await expenseService.getAllExpenses(req.query);
    return Response(res, 200, true, 'Expenses fetched successfully', expenses);
  } catch (error) {
    next(error);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);
    return Response(res, 200, true, 'Expense fetched successfully', expense);
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    await expenseService.deleteExpense(req.params.id);

    return Response(res, 200, true, 'Expense deleted successfully', null);
  } catch (error) {
    next(error);
  }
};
