import React from 'react';
import { useBudget } from '../context/BudgetContext';

const BudgetSummary = () => {
  const { 
    getTotalIncome, 
    getTotalExpenses, 
    getRemainingBudget,
    getExpensesByCategory,
    income,
    expenses 
  } = useBudget();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const remainingBudget = getRemainingBudget();
  const expensesByCategory = getExpensesByCategory();

  const isOverBudget = remainingBudget < 0;

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20 animate-slideInUp">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Budget Overview</h3>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-sm">Current Status</p>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isOverBudget ? 'bg-red-500/20 text-red-300 border border-red-400/30' : 'bg-green-500/20 text-green-300 border border-green-400/30'
          }`}>
            {isOverBudget ? '⚠️ Over Budget' : '✅ On Track'}
          </div>
        </div>
      </div>
      
      {/* Modern Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 p-6 rounded-xl border border-emerald-400/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-500/30 rounded-lg flex items-center justify-center">
              <span className="text-lg">💵</span>
            </div>
            <div className="text-emerald-300 text-sm font-medium">+{((totalIncome / (totalIncome + totalExpenses)) * 100 || 0).toFixed(0)}%</div>
          </div>
          <h4 className="text-emerald-300 text-sm font-semibold mb-1">Total Income</h4>
          <p className="text-3xl font-bold text-white">${totalIncome.toLocaleString()}</p>
          <p className="text-emerald-200 text-xs mt-1">This month</p>
        </div>
        
        <div className="bg-gradient-to-br from-rose-400/20 to-rose-600/20 p-6 rounded-xl border border-rose-400/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-rose-500/30 rounded-lg flex items-center justify-center">
              <span className="text-lg">💸</span>
            </div>
            <div className="text-rose-300 text-sm font-medium">-{((totalExpenses / (totalIncome + totalExpenses)) * 100 || 0).toFixed(0)}%</div>
          </div>
          <h4 className="text-rose-300 text-sm font-semibold mb-1">Total Expenses</h4>
          <p className="text-3xl font-bold text-white">${totalExpenses.toLocaleString()}</p>
          <p className="text-rose-200 text-xs mt-1">This month</p>
        </div>
        
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${
          isOverBudget 
            ? 'bg-gradient-to-br from-red-400/20 to-red-600/20 border-red-400/30' 
            : 'bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-blue-400/30'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isOverBudget ? 'bg-red-500/30' : 'bg-blue-500/30'
            }`}>
              <span className="text-lg">{isOverBudget ? '⚠️' : '💰'}</span>
            </div>
            <div className={`text-sm font-medium ${
              isOverBudget ? 'text-red-300' : 'text-blue-300'
            }`}>
              {isOverBudget ? 'DEFICIT' : 'SURPLUS'}
            </div>
          </div>
          <h4 className={`text-sm font-semibold mb-1 ${
            isOverBudget ? 'text-red-300' : 'text-blue-300'
          }`}>
            {isOverBudget ? 'Over Budget' : 'Remaining'}
          </h4>
          <p className="text-3xl font-bold text-white">
            ${Math.abs(remainingBudget).toLocaleString()}
          </p>
          <p className={`text-xs mt-1 ${
            isOverBudget ? 'text-red-200' : 'text-blue-200'
          }`}>
            Available funds
          </p>
        </div>
      </div>

      {/* Enhanced Alert */}
      {isOverBudget && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-200 px-6 py-4 rounded-xl mb-6 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500/30 rounded-lg flex items-center justify-center">
              <span>⚠️</span>
            </div>
            <div>
              <p className="font-semibold">Budget Exceeded!</p>
              <p className="text-sm text-red-300">You've overspent by ${Math.abs(remainingBudget).toLocaleString()}. Consider reviewing your expenses.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modern Expense Categories */}
      {Object.keys(expensesByCategory).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-sm">📊</span>
            </div>
            <h4 className="text-lg font-semibold text-white">Expense Breakdown</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(expensesByCategory).map(([category, amount]) => {
              const percentage = totalExpenses > 0 ? ((amount / totalExpenses) * 100) : 0;
              const gradients = {
                'Food': 'from-yellow-400/20 to-orange-500/20 border-yellow-400/30',
                'Transportation': 'from-blue-400/20 to-cyan-500/20 border-blue-400/30',
                'Entertainment': 'from-purple-400/20 to-pink-500/20 border-purple-400/30',
                'Healthcare': 'from-green-400/20 to-emerald-500/20 border-green-400/30',
                'Shopping': 'from-red-400/20 to-rose-500/20 border-red-400/30',
                'Utilities': 'from-indigo-400/20 to-blue-500/20 border-indigo-400/30'
              };
              const gradient = gradients[category] || 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
              
              return (
                <div key={category} className={`bg-gradient-to-br ${gradient} p-4 rounded-xl border backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{category}</span>
                    <span className="text-xs text-blue-200">{percentage.toFixed(1)}%</span>
                  </div>
                  <p className="text-xl font-bold text-white">${amount.toFixed(2)}</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-white/40 to-white/60 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity Indicator */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-blue-200 text-sm">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
        <div className="text-blue-200 text-sm">
          {income.length + expenses.length} transactions total
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
