import React from 'react';
import { useBudget } from '../context/BudgetContext';

const TransactionList = () => {
  const { income, expenses, deleteIncome, deleteExpense } = useBudget();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20 animate-slideInUp">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Recent Transactions</h3>
            <p className="text-indigo-200 text-sm">Your latest financial activity</p>
          </div>
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
          <span className="text-white text-sm font-medium">
            {income.length + expenses.length} total
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Income Section */}
        {income.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-500/30 rounded-lg flex items-center justify-center">
                <span className="text-sm">💵</span>
              </div>
              <h4 className="text-lg font-semibold text-emerald-300">Income</h4>
              <div className="flex-1 h-px bg-emerald-400/20"></div>
            </div>
            <div className="space-y-3">
              {income.map((item) => (
                <div key={item.id} className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-4 backdrop-blur-sm group hover:bg-emerald-500/15 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-white">{item.source}</p>
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-400/30">
                          {item.frequency}
                        </span>
                      </div>
                      <p className="text-emerald-200 text-sm">{formatDate(item.date)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-xl font-bold text-emerald-300">+${item.amount.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => deleteIncome(item.id)}
                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Delete income"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expense Section */}
        {expenses.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-rose-500/30 rounded-lg flex items-center justify-center">
                <span className="text-sm">💸</span>
              </div>
              <h4 className="text-lg font-semibold text-rose-300">Expenses</h4>
              <div className="flex-1 h-px bg-rose-400/20"></div>
            </div>
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="bg-rose-500/10 border border-rose-400/20 rounded-xl p-4 backdrop-blur-sm group hover:bg-rose-500/15 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-white">{expense.description}</p>
                        <span className="px-2 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full border border-rose-400/30">
                          {expense.category}
                        </span>
                      </div>
                      <p className="text-rose-200 text-sm">{formatDate(expense.date)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-xl font-bold text-rose-300">-${expense.amount.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Delete expense"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {income.length === 0 && expenses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h4 className="text-white font-semibold mb-2">No transactions yet</h4>
            <p className="text-blue-200 text-sm">Start by adding your income or expenses to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
