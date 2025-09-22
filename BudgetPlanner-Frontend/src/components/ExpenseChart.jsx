import React from 'react';
import { useBudget } from '../context/BudgetContext';

const ExpenseChart = () => {
  const { getExpensesByCategory, getTotalExpenses } = useBudget();
  
  const expensesByCategory = getExpensesByCategory();
  const totalExpenses = getTotalExpenses();
  
  if (totalExpenses === 0) {
    return (
      <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20 animate-slideInUp">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Expense Breakdown</h3>
            <p className="text-rose-200 text-sm">Visualize your spending patterns</p>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <h4 className="text-white font-semibold mb-2">No expenses to display yet.</h4>
          <p className="text-rose-200 text-sm">Add some expenses to see your spending breakdown.</p>
        </div>
      </div>
    );
  }

  // Modern gradient colors for categories
  const colors = [
    'from-rose-400 to-pink-600', 'from-blue-400 to-indigo-600', 'from-yellow-400 to-orange-600', 
    'from-emerald-400 to-teal-600', 'from-purple-400 to-violet-600', 'from-orange-400 to-red-600',
    'from-cyan-400 to-blue-600', 'from-lime-400 to-green-600', 'from-pink-400 to-rose-600'
  ];

  const solidColors = [
    '#f43f5e', '#3b82f6', '#f59e0b', '#10b981', 
    '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16', '#ec4899'
  ];

  const categoryData = Object.entries(expensesByCategory).map(([category, amount], index) => ({
    category,
    amount,
    percentage: (amount / totalExpenses * 100).toFixed(1),
    color: solidColors[index % solidColors.length],
    gradient: colors[index % colors.length]
  }));

  // Simple pie chart using CSS and basic calculations
  let cumulativePercentage = 0;
  const pieSlices = categoryData.map((data, index) => {
    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
    const endAngle = (cumulativePercentage + parseFloat(data.percentage)) * 3.6;
    cumulativePercentage += parseFloat(data.percentage);
    
    return {
      ...data,
      startAngle,
      endAngle
    };
  });

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20 animate-slideInUp">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">📊</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Expense Breakdown</h3>
          <p className="text-rose-200 text-sm">Visualize your spending patterns</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Modern Pie Chart */}
        <div className="relative">
          <div className="w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/20" style={{
            background: `conic-gradient(${pieSlices.map(slice => 
              `${slice.color} ${slice.startAngle}deg ${slice.endAngle}deg`
            ).join(', ')})`
          }}>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass rounded-full w-24 h-24 flex items-center justify-center shadow-2xl border border-white/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">${totalExpenses.toFixed(0)}</div>
                <div className="text-xs text-rose-200 font-medium">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Legend */}
        <div className="space-y-4">
          {categoryData.map((data, index) => (
            <div key={data.category} className="flex items-center space-x-4 p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${data.gradient} shadow-lg`}></div>
              <div className="flex-1">
                <div className="text-white font-semibold">{data.category}</div>
                <div className="text-rose-200 text-sm">
                  ${data.amount.toFixed(2)} • {data.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Category Bars */}
      <div className="mt-10">
        <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <span>📈</span>
          <span>Category Details</span>
        </h4>
        <div className="space-y-4">
          {categoryData.map((data) => (
            <div key={data.category} className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${data.gradient} shadow-lg`}></div>
                  <span className="text-white font-semibold">{data.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">${data.amount.toFixed(2)}</div>
                  <div className="text-rose-200 text-sm">{data.percentage}%</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${data.gradient} shadow-lg`}
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
