import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

const IncomeForm = () => {
  const { addIncome } = useBudget();
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    frequency: 'monthly'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.source && formData.amount) {
      addIncome({
        source: formData.source,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        date: new Date().toISOString().split('T')[0]
      });
      setFormData({ source: '', amount: '', frequency: 'monthly' });
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
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">💵</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Add Income</h3>
          <p className="text-emerald-200 text-sm">Track your earnings and revenue streams</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-emerald-200">
            Income Source
          </label>
          <div className="relative">
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-emerald-200 transition-all duration-300"
              placeholder="e.g., Salary, Freelance, Investment"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-emerald-200">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <span className="text-emerald-300 text-lg font-bold">$</span>
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-emerald-200 transition-all duration-300"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-emerald-200">
            Frequency
          </label>
          <div className="relative">
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white transition-all duration-300 appearance-none"
            >
              <option value="monthly" className="bg-gray-800 text-white">Monthly</option>
              <option value="weekly" className="bg-gray-800 text-white">Weekly</option>
              <option value="daily" className="bg-gray-800 text-white">Daily</option>
              <option value="yearly" className="bg-gray-800 text-white">Yearly</option>
              <option value="one-time" className="bg-gray-800 text-white">One-time</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Income Source</span>
        </button>
      </form>

      {/* Income Tips */}
      <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-400/20 rounded-xl backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">💡</span>
          <h4 className="text-emerald-300 font-semibold">Income Tip</h4>
        </div>
        <p className="text-emerald-200 text-sm">
          Track all income sources including side hustles, investments, and irregular earnings to get a complete financial picture.
        </p>
      </div>
    </div>
  );
};

export default IncomeForm;
