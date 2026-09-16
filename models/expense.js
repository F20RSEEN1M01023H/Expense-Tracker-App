import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      validate: [(v) => v > 0, 'Amount must be a positive number'],
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['food', 'transport', 'bills', 'shopping', 'other'],
    },
    note: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1, date: -1 });

export default mongoose.model('Expense', expenseSchema);
