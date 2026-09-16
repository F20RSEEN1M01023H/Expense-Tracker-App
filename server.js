import express from 'express';
import 'dotenv/config';
import { connectDb } from './config/Database.js';
import Response from './utils/responseModel.js';
import { errorHandler } from './middlewares/errorHandler.js';
import expenseRouter from './routes/expenseRoutes.js';
import summaryRouter from './routes/summaryRoutes.js';

connectDb();

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  Response(res, 200, null, 'Expense Tracker Api is running smoothly');
});

app.use('/api/expenses', expenseRouter);
app.use('/api/summary', summaryRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
  });
});

const PORT = process.env.PORT || 3000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
