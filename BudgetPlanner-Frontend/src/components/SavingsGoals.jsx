import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

const SavingsGoals = () => {
  const { savingsGoals, addSavingsGoal, deleteSavingsGoal, updateSavingsGoal } = useBudget();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.targetAmount) {
      addSavingsGoal({
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount) || 0,
        deadline: formData.deadline,
        createdDate: new Date().toISOString().split('T')[0]
      });
      setFormData({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addToSavings = (goalId, amount) => {
    const goal = savingsGoals.find(g => g.id === goalId);
    if (goal) {
      const currentAmount = goal.currentAmount || goal.currentamount || 0;
      const newAmount = currentAmount + parseFloat(amount);
      updateSavingsGoal(goalId, { currentAmount: newAmount });
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20 animate-slideInUp">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Savings Goals</h3>
            <p className="text-yellow-200 text-sm">Track your financial targets</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>{showForm ? 'Cancel' : 'Add Goal'}</span>
        </button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-white/10 rounded-xl p-6 mb-8 border border-white/20 backdrop-blur-sm animate-slideInUp">
          <h4 className="text-lg font-semibold text-white mb-6">Create New Savings Goal</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-yellow-200">Goal Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-yellow-200 transition-all duration-300"
                placeholder="e.g., Emergency Fund"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-yellow-200">Target Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-yellow-300 text-lg font-bold">$</span>
                </div>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-yellow-200 transition-all duration-300"
                  placeholder="10000"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-yellow-200">Current Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-yellow-300 text-lg font-bold">$</span>
                </div>
                <input
                  type="number"
                  name="currentAmount"
                  value={formData.currentAmount}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-yellow-200 transition-all duration-300"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-yellow-200">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white transition-all duration-300"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              >
                Create Goal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-6">
        {savingsGoals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h4 className="text-white font-semibold mb-2">No savings goals yet</h4>
            <p className="text-yellow-200 text-sm">Create your first savings goal to start tracking your progress.</p>
          </div>
        ) : (
          savingsGoals.map((goal) => {
            console.log('Goal object:', goal); // Debug log
            const currentAmount = goal.currentAmount || goal.currentamount || 0;
            const targetAmount = goal.targetAmount || goal.targetamount || 0;
            const progress = getProgressPercentage(currentAmount, targetAmount);
            const isCompleted = progress >= 100;
            
            return (
              <div key={goal.id} className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-yellow-400 to-orange-600'
                    }`}>
                      <span className="text-2xl">{isCompleted ? '✅' : '🎯'}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{goal.name || goal.goalname}</h4>
                      <p className="text-yellow-200 text-sm">
                        ${currentAmount.toLocaleString()} of ${targetAmount.toLocaleString()}
                        {(goal.deadline || goal.deadlinedate) && ` • Due ${formatDate(goal.deadline || goal.deadlinedate)}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSavingsGoal(goal.id)}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">Progress</span>
                    <span className={`text-sm font-bold ${isCompleted ? 'text-green-300' : 'text-yellow-300'}`}>
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Add Money Form */}
                {!isCompleted && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Add amount"
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-yellow-200"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                          addToSavings(goal.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.target.parentElement.querySelector('input');
                        if (input.value) {
                          addToSavings(goal.id, input.value);
                          input.value = '';
                        }
                      }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavingsGoals;
