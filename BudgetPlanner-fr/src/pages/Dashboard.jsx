import React, { useState } from 'react';
import { BudgetProvider, useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import IncomeForm from '../components/IncomeForm';
import ExpenseForm from '../components/ExpenseForm';
import BudgetSummary from '../components/BudgetSummary';
import TransactionList from '../components/TransactionList';
import SavingsGoals from '../components/SavingsGoals';
import ExpenseChart from '../components/ExpenseChart';

// New Dashboard Overview Component
const DashboardOverview = ({ onQuickAction }) => {
  const { getTotalIncome, getTotalExpenses, income, expenses, savingsGoals } = useBudget();
  
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = totalIncome - totalExpenses;
  
  // Combine income and expenses into transactions with type
  const allTransactions = [
    ...income.map((item, index) => ({ ...item, type: 'income', uniqueKey: `income-${item.id || index}` })),
    ...expenses.map((item, index) => ({ ...item, type: 'expense', uniqueKey: `expense-${item.id || index}` }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  
  const recentTransactions = allTransactions.slice(0, 5);
  
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalSavingsTarget = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const savingsProgress = totalSavingsTarget > 0 ? (totalSavings / totalSavingsTarget) * 100 : 0;

  const quickStats = [
    {
      title: 'Total Balance',
      value: `$${balance.toLocaleString()}`,
      change: balance >= 0 ? '+' : '',
      changeColor: balance >= 0 ? 'text-emerald-300' : 'text-rose-300',
      icon: '💰',
      gradient: 'from-emerald-400 to-teal-600',
      bgGradient: 'from-emerald-500/20 to-teal-600/20'
    },
    {
      title: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      change: `${income.length} sources`,
      changeColor: 'text-emerald-300',
      icon: '📈',
      gradient: 'from-green-400 to-emerald-600',
      bgGradient: 'from-green-500/20 to-emerald-600/20'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      change: `${expenses.length} transactions`,
      changeColor: 'text-rose-300',
      icon: '💸',
      gradient: 'from-rose-400 to-pink-600',
      bgGradient: 'from-rose-500/20 to-pink-600/20'
    },
    {
      title: 'Savings Progress',
      value: `${savingsProgress.toFixed(1)}%`,
      change: `$${totalSavings.toLocaleString()} saved`,
      changeColor: 'text-yellow-300',
      icon: '🎯',
      gradient: 'from-yellow-400 to-orange-600',
      bgGradient: 'from-yellow-500/20 to-orange-600/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div
            key={stat.title}
            className={`glass rounded-2xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300 animate-slideInUp bg-gradient-to-br ${stat.bgGradient}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className={`text-sm font-medium ${stat.changeColor}`}>
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-white/70 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="glass rounded-2xl p-6 shadow-2xl border border-white/20 animate-slideInLeft">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span>⚡</span>
              <span>Quick Actions</span>
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => onQuickAction('income')}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <span className="text-lg">💰</span>
                <span className="font-semibold">Add Income</span>
              </button>
              <button 
                onClick={() => onQuickAction('expenses')}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <span className="text-lg">💸</span>
                <span className="font-semibold">Add Expense</span>
              </button>
              <button 
                onClick={() => onQuickAction('savings')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <span className="text-lg">🎯</span>
                <span className="font-semibold">Set Goal</span>
              </button>
            </div>
          </div>

          {/* Budget Health Card */}
          <div className="glass rounded-2xl p-6 shadow-2xl border border-white/20 animate-slideInLeft" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span>❤️</span>
              <span>Budget Health</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Spending Ratio</span>
                <span className="text-white font-bold">
                  {totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    totalIncome > 0 && (totalExpenses / totalIncome) > 0.8
                      ? 'bg-gradient-to-r from-red-400 to-rose-500'
                      : totalIncome > 0 && (totalExpenses / totalIncome) > 0.6
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                      : 'bg-gradient-to-r from-green-400 to-emerald-500'
                  }`}
                  style={{ width: `${totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0}%` }}
                ></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  totalIncome > 0 && (totalExpenses / totalIncome) > 0.8
                    ? 'bg-red-400'
                    : totalIncome > 0 && (totalExpenses / totalIncome) > 0.6
                    ? 'bg-yellow-400'
                    : 'bg-green-400'
                }`}></div>
                <span className="text-white/80 text-sm">
                  {totalIncome > 0 && (totalExpenses / totalIncome) > 0.8
                    ? 'High spending - Consider reducing expenses'
                    : totalIncome > 0 && (totalExpenses / totalIncome) > 0.6
                    ? 'Moderate spending - Room for improvement'
                    : 'Healthy spending - Great job!'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Recent Activity */}
        <div className="glass rounded-2xl p-6 shadow-2xl border border-white/20 animate-slideInUp" style={{ animationDelay: '300ms' }}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span>Recent Activity</span>
            </div>
            <span className="text-sm text-white/60">{recentTransactions.length} recent</span>
          </h3>
          
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-white/60">No recent transactions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={transaction.uniqueKey || `transaction-${index}`}
                  className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-600' 
                        : 'bg-gradient-to-br from-rose-400 to-pink-600'
                    }`}>
                      <span className="text-lg">{transaction.type === 'income' ? '💰' : '💸'}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{transaction.description}</p>
                      <p className="text-white/60 text-sm">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'income' ? 'text-emerald-300' : 'text-rose-300'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-sm">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Goals & Insights */}
        <div className="space-y-6">
          {/* Monthly Overview */}
          <div className="glass rounded-2xl p-6 shadow-2xl border border-white/20 animate-slideInRight">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span>📅</span>
              <span>This Month</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Income</span>
                <span className="text-emerald-300 font-bold">+${totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Expenses</span>
                <span className="text-rose-300 font-bold">-${totalExpenses.toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Net</span>
                  <span className={`font-bold text-lg ${balance >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {balance >= 0 ? '+' : ''}${balance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Overview */}
          <div className="glass rounded-2xl p-6 shadow-2xl border border-white/20 animate-slideInRight" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span>🎯</span>
              <span>Savings Goals</span>
            </h3>
            {savingsGoals.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">No savings goals set</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Progress</span>
                  <span className="text-yellow-300 font-bold">{savingsProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${Math.min(savingsProgress, 100)}%` }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">${totalSavings.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">of ${totalSavingsTarget.toLocaleString()} target</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'income', name: 'Income', icon: '💰' },
    { id: 'expenses', name: 'Expenses', icon: '💸' },
    { id: 'savings', name: 'Savings', icon: '🎯' },
    { id: 'analytics', name: 'Analytics', icon: '📈' }
  ];

  // Function to handle quick actions
  const handleQuickAction = (action) => {
    setActiveTab(action);
  };

  return (
    <BudgetProvider>
      <div className="min-h-screen gradient-purple flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 glass border-r border-white/10 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Budget Planner</h1>
                <p className="text-blue-200 text-xs">Smart financial management</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">👋</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Hi, {user?.username}</p>
                <p className="text-blue-200 text-xs">Welcome back!</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={logout}
              className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl border border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="glass border-b border-white/10 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
                <p className="text-blue-200 text-sm">
                  {activeTab === 'dashboard' && 'Overview of your financial status'}
                  {activeTab === 'income' && 'Manage your income sources'}
                  {activeTab === 'expenses' && 'Track your spending'}
                  {activeTab === 'savings' && 'Monitor your savings goals'}
                  {activeTab === 'analytics' && 'Detailed financial analysis'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-white/80 text-sm">
                  <span>🗓️</span>
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">Live</span>
              </div>
            </div>
          </header>

          {/* Main Content with Animated Background */}
          <main className="flex-1 p-6 relative overflow-auto">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-20 left-1/2 w-24 h-24 bg-purple-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto">
              {activeTab === 'dashboard' && (
                <div className="animate-fadeIn">
                  <DashboardOverview onQuickAction={handleQuickAction} />
                </div>
              )}

              {activeTab === 'income' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fadeIn">
                  <div className="animate-slideInLeft">
                    <IncomeForm />
                  </div>
                  <div className="animate-slideInUp">
                    <TransactionList />
                  </div>
                </div>
              )}

              {activeTab === 'expenses' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fadeIn">
                  <div className="animate-slideInLeft">
                    <ExpenseForm />
                  </div>
                  <div className="animate-slideInUp">
                    <TransactionList />
                  </div>
                </div>
              )}

              {activeTab === 'savings' && (
                <div className="space-y-8 animate-fadeIn">
                  <SavingsGoals />
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="animate-slideInUp">
                    <ExpenseChart />
                  </div>
                  <div className="animate-slideInLeft">
                    <BudgetSummary />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </BudgetProvider>
  );
};

export default Dashboard;
