import * as summaryService from '../services/summaryService.js';
import Response from '../utils/responseModel.js';

export const getMonthlySummary = async (req, res, next) => {
  try {
    const data = await summaryService.getMonthlySummary();
    return Response(res, 200, true, 'Monthly summary retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

export const getCategorySummary = async (req, res, next) => {
  try {
    const { month } = req.query;
    const data = await summaryService.getCategorySummary(month);
    return Response(res, 200, true, 'Category summary retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

export const getTopExpenses = async (req, res, next) => {
  try {
    const { month } = req.query;
    const data = await summaryService.getTopExpenses(month);
    return Response(res, 200, true, 'Top expenses retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};
