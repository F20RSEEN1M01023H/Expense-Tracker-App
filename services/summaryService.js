import Expense from '../models/expense.js';
import { getMonthRange } from '../utils/dateUtils.js';

export const getMonthlySummary = async () => {
  return await Expense.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
        },
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        total: 1,
        count: 1,
      },
    },
  ]);
};

export const getCategorySummary = async (monthStr) => {
  const pipeline = [];

  if (monthStr) {
    const { start, end } = getMonthRange(monthStr);
    pipeline.push({ $match: { date: { $gte: start, $lt: end } } });
  }

  pipeline.push(
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $sort: { total: -1 } },
  );

  const results = await Expense.aggregate(pipeline);
  const grandTotal = results.reduce((acc, row) => acc + row.total, 0);

  return results.map((row) => ({
    category: row._id,
    total: row.total,
    percentage: grandTotal > 0 ? Number(((row.total / grandTotal) * 100).toFixed(2)) : 0,
  }));
};

export const getTopExpenses = async (monthStr) => {
  const pipeline = [];

  if (monthStr) {
    const { start, end } = getMonthRange(monthStr);
    pipeline.push({ $match: { date: { $gte: start, $lt: end } } });
  }

  pipeline.push({ $sort: { amount: -1 } }, { $limit: 5 });

  return await Expense.aggregate(pipeline);
};
