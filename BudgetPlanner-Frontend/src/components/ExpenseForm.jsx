import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

const ExpenseForm = () => {
  const { addExpense, categories } = useBudget();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: categories[0],
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount) {
      addExpense({
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date
      });
      setFormData({
        description: '',
        amount: '',
        category: categories[0],
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20 animate-slideInLeft">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">💸</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Add Expense</h3>
          <p className="text-rose-200 text-sm">Track your spending and expenses</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-rose-200">
            Description
          </label>
          <div className="relative">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-white placeholder-rose-200 transition-all duration-300"
              placeholder="e.g., Groceries, Gas, Dinner"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-rose-200">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <span className="text-rose-300 text-lg font-bold">$</span>
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-white placeholder-rose-200 transition-all duration-300"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-rose-200">
            Category
          </label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-white transition-all duration-300 appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800 text-white">
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-rose-200">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent text-white transition-all duration-300"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-rose-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Expense</span>
        </button>
      </form>

      {/* Expense Tips */}
      <div className="mt-8 p-4 bg-rose-500/10 border border-rose-400/20 rounded-xl backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">💡</span>
          <h4 className="text-rose-300 font-semibold">Spending Tip</h4>
        </div>
        <p className="text-rose-200 text-sm">
          Categorize expenses consistently to better understand your spending patterns and identify areas for improvement.
        </p>
      </div>
    </div>
  );
};

export default ExpenseForm;
