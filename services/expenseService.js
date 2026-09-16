import mongoose from 'mongoose';
import Expense from '../models/expense.js';
import ApiError from '../utils/apiError.js';

export const createExpense = async (payload) => {
  const { amount, category, note, date } = payload;

  const expense = await Expense.create({
    amount,
    category,
    note,
    ...(date && { date: new Date(date) }),
  });

  return expense;
};

export const getAllExpenses = async (filters) => {
  const { category, from, to } = filters;
  const query = {};

  if (category) {
    query.category = category;
  }

  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  return await Expense.find(query).sort({ date: -1 });
};

export const getExpenseById = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, 'Invalid expense ID format');
  }

  const expense = await Expense.findById(id);
  if (!expense) {
    throw new ApiError(404, 'Expense not found');
  }

  return expense;
};

export const deleteExpense = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, 'Invalid expense ID format');
  }

  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) {
    throw new ApiError(404, 'Expense not found');
  }

  return expense;
};
