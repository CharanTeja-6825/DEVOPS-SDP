import React, { useState } from 'react';
import { BudgetProvider, useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import IncomeForm from '../components/IncomeForm';
import ExpenseForm from '../components/ExpenseForm';
import BudgetSummary from '../components/BudgetSummary';
import TransactionList from '../components/TransactionList';
import SavingsGoals from '../components/SavingsGoals';
import ExpenseChart from '../components/ExpenseChart';
import UserProfile from './UserProfile';

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
      {/* Hero Stats Grid - Unique Geometric Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="relative p-8 bg-gradient-to-br from-primary/20 to-[#1a1d23] border-l-8 border-primary shadow-2xl transform -skew-y-1 hover:skew-y-0 transition-all duration-300 animate-fadeIn">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl"></div>
          <div className="transform skew-y-1 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center border-4 border-primary/40 transform rotate-45 shadow-lg">
                <span className="text-3xl transform -rotate-45">💰</span>
              </div>
              <span className="text-sm font-black uppercase tracking-wider theme-primary">Total Balance</span>
            </div>
            <p className={`text-5xl font-black mb-2 ${balance >= 0 ? 'theme-primary' : 'theme-accent'}`}>{balance >= 0 ? '+' : ''}${balance.toLocaleString()}</p>
            <p className="text-light/60 text-sm font-bold uppercase">{income.length} income sources</p>
          </div>
        </div>

        {/* Income Card */}
        <div className="relative p-8 bg-gradient-to-br from-primary/15 via-[#1a1d23] to-transparent border-t-8 border-primary shadow-2xl transform skew-x-1 hover:skew-x-0 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-3xl"></div>
          <div className="transform -skew-x-1 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center border-4 border-primary/40" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                <span className="text-3xl">📈</span>
              </div>
              <span className="text-sm font-black uppercase tracking-wider theme-primary">Total Income</span>
            </div>
            <p className="text-5xl font-black mb-2 text-emerald-300">+${totalIncome.toLocaleString()}</p>
            <p className="text-light/60 text-sm font-bold uppercase">{income.length} transactions</p>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="relative p-8 bg-gradient-to-br from-accent/20 to-[#1a1d23] border-r-8 border-accent shadow-2xl transform -skew-x-1 hover:skew-x-0 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl"></div>
          <div className="transform skew-x-1 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center border-4 border-accent/40" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <span className="text-3xl">💸</span>
              </div>
              <span className="text-sm font-black uppercase tracking-wider theme-accent">Total Expenses</span>
            </div>
            <p className="text-5xl font-black mb-2 text-rose-300">-${totalExpenses.toLocaleString()}</p>
            <p className="text-light/60 text-sm font-bold uppercase">{expenses.length} transactions</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid - Unique 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="relative p-8 bg-gradient-to-br from-[#08D9D6]/15 via-[#1e2329] to-[#242a32] border-l-8 border-primary shadow-2xl animate-fadeIn" style={{ animationDelay: '300ms', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl opacity-30"></div>
          
          <h3 className="text-2xl font-black mb-8 flex items-center justify-between relative z-10 uppercase tracking-wider">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center border-4 border-primary/40 transform rotate-45 shadow-lg">
                <span className="text-2xl transform -rotate-45">📊</span>
              </div>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Activity Feed</span>
            </div>
            <div className="px-5 py-2 bg-gradient-to-r from-primary/30 to-accent/30 text-sm font-black border-2 border-primary/50 transform -skew-x-6">
              <span className="transform skew-x-6 block theme-primary">{recentTransactions.length} RECENT</span>
            </div>
          </h3>
          
          {recentTransactions.length === 0 ? (
            <div className="text-center py-16 relative z-10">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#242a32] to-[#1a1d23] flex items-center justify-center mb-6 border-4 border-[#3a404b] transform rotate-45 shadow-2xl">
                <span className="text-5xl transform -rotate-45">📈</span>
              </div>
              <p className="text-light/40 font-bold text-lg uppercase tracking-wider">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-4 relative z-10">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={transaction.uniqueKey || `transaction-${index}`}
                  className={`group relative flex items-center justify-between p-5 transition-all duration-300 border-2 hover:scale-[1.03] ${
                    transaction.type === 'income' 
                      ? 'bg-gradient-to-r from-primary/25 via-primary/10 to-transparent border-l-8 border-primary hover:border-primary/80 hover:from-primary/35 transform skew-y-1 hover:skew-y-0' 
                      : 'bg-gradient-to-r from-accent/25 via-accent/10 to-transparent border-l-8 border-accent hover:border-accent/80 hover:from-accent/35 transform -skew-y-1 hover:skew-y-0'
                  }`}
                  style={{ 
                    clipPath: transaction.type === 'income' 
                      ? 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' 
                      : 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                  }}
                >
                  <div className="flex items-center gap-5">
                    <div className={`relative w-16 h-16 flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:rotate-12 ${
                      transaction.type === 'income' 
                        ? 'bg-gradient-to-br from-primary to-primary/50 border-4 border-primary/40' 
                        : 'bg-gradient-to-br from-accent to-accent/50 border-4 border-accent/40'
                    }`}
                      style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
                    >
                      <span className="text-2xl">{transaction.type === 'income' ? '💰' : '💸'}</span>
                    </div>
                    <div>
                      <p className="font-black text-lg uppercase tracking-wide">{transaction.description}</p>
                      <p className="text-light/50 text-sm mt-2 flex items-center gap-3">
                        <span className={`px-3 py-1 font-bold text-xs uppercase transform -skew-x-6 ${
                          transaction.type === 'income' ? 'bg-primary/20 border border-primary/50' : 'bg-accent/20 border border-accent/50'
                        }`}>
                          <span className="transform skew-x-6 block">{transaction.category}</span>
                        </span>
                        <span className="font-semibold">{transaction.date}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-2xl tracking-tight ${
                      transaction.type === 'income' ? 'theme-primary' : 'theme-accent'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Monthly Overview */}
        <div className="relative p-8 bg-gradient-to-br from-[#FF2E63]/15 via-[#1e2329] to-[#1a1d23] border-r-8 border-accent shadow-2xl transform -skew-y-1 hover:skew-y-0 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 blur-3xl"></div>
          
          <h3 className="text-2xl font-black mb-8 flex items-center gap-4 relative z-10 uppercase tracking-wider transform skew-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-4 border-accent/50 shadow-lg transform rotate-45">
              <span className="text-2xl transform -rotate-45">📅</span>
            </div>
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">Monthly Stats</span>
          </h3>
          
          <div className="space-y-5 relative z-10 transform skew-y-1">
            <div className="p-6 bg-gradient-to-r from-primary/20 to-[#242a32] border-l-8 border-primary flex justify-between items-center hover:border-primary/60 hover:from-primary/30 transition-all transform skew-x-1 hover:skew-x-0 shadow-lg">
              <div className="flex items-center gap-3 transform -skew-x-1">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center border-2 border-primary/70 shadow-lg">
                  <span className="text-3xl">💰</span>
                </div>
                <span className="font-black text-lg uppercase tracking-wide">Income</span>
              </div>
              <span className="text-emerald-300 font-black text-3xl transform -skew-x-1">+${totalIncome.toLocaleString()}</span>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-accent/20 to-[#242a32] border-l-8 border-accent flex justify-between items-center hover:border-accent/60 hover:from-accent/30 transition-all transform -skew-x-1 hover:skew-x-0 shadow-lg">
              <div className="flex items-center gap-3 transform skew-x-1">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/50 to-accent/20 flex items-center justify-center border-2 border-accent/70 shadow-lg">
                  <span className="text-3xl">💸</span>
                </div>
                <span className="font-black text-lg uppercase tracking-wide">Expenses</span>
              </div>
              <span className="text-rose-300 font-black text-3xl transform skew-x-1">-${totalExpenses.toLocaleString()}</span>
            </div>
            
            <div className="mt-6 p-8 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 border-4 border-dashed ${
              balance >= 0 ? 'border-primary/80 shadow-primary/20' : 'border-accent/80 shadow-accent/20'
            } transform skew-y-1 hover:skew-y-0 transition-all shadow-2xl">
              <div className="flex justify-between items-center transform -skew-y-1">
                <span className="font-black text-xl uppercase tracking-widest">Net Balance</span>
                <span className={`font-black text-4xl ${
                  balance >= 0 ? 'theme-primary' : 'theme-accent'
                }`}>
                  {balance >= 0 ? '+' : ''}${balance.toLocaleString()}
                </span>
              </div>
            </div>
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
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'profile', name: 'Profile', icon: '👤' }
  ];

  // Function to handle quick actions
  const handleQuickAction = (action) => {
    setActiveTab(action);
  };

  return (
    <BudgetProvider>
      <div className="min-h-screen bg-[#252A34] flex">
        {/* Sidebar Navigation */}
        <aside className="w-20 bg-gradient-to-b from-[#1a1d23] to-[#252A34] border-r-4 border-primary/30 flex flex-col items-center shadow-2xl">
          {/* Sidebar Header */}
          <div className="p-4 border-b-2 border-primary/20 w-full">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg transform rotate-45 hover:rotate-0 transition-all duration-300 mx-auto">
              <span className="text-2xl transform -rotate-45">💰</span>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b-2 border-primary/20 w-full">
            <div className="w-12 h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center border-2 border-accent/50 mx-auto hover:scale-110 transition-all duration-300">
              <span className="text-xl">👋</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-2 py-6">
            <div className="space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/50 transform rotate-12'
                      : 'bg-[#2a3038] hover:bg-[#3a404b] border-2 border-[#3a404b] hover:border-primary/50 hover:scale-110'
                  }`}
                  title={tab.name}
                >
                  <span className={`text-xl transition-transform duration-300 ${
                    activeTab === tab.id ? 'transform -rotate-12' : 'group-hover:scale-125'
                  }`}>{tab.icon}</span>
                  {activeTab === tab.id && (
                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-accent rounded-full animate-pulse border-2 border-[#252A34]"></div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t-2 border-accent/20 w-full">
            <button
              onClick={logout}
              className="w-12 h-12 bg-gradient-to-br from-accent/30 to-accent/10 hover:from-accent/50 hover:to-accent/20 border-2 border-accent/50 flex items-center justify-center transition-all duration-300 mx-auto hover:scale-110 shadow-lg"
              title="Logout"
            >
              <span className="text-xl">🚪</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="bg-gradient-to-r from-[#1a1d23] to-[#252A34] border-b-4 border-primary/30 p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-wider bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{activeTab}</h2>
                <p className="text-light/60 text-sm font-semibold mt-1">
                  {activeTab === 'dashboard' && 'Overview of your financial status'}
                  {activeTab === 'income' && 'Manage your income sources'}
                  {activeTab === 'expenses' && 'Track your spending'}
                  {activeTab === 'savings' && 'Monitor your savings goals'}
                  {activeTab === 'analytics' && 'Detailed financial analysis'}
                  {activeTab === 'profile' && 'Manage your account settings'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#2a3038] border-2 border-primary/30 transform -skew-x-6">
                  <span className="transform skew-x-6 flex items-center gap-2 font-bold text-sm">
                    <span>🗓️</span>
                    <span className="theme-primary">{new Date().toLocaleDateString()}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/50">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
                  <span className="theme-primary text-sm font-black uppercase">Live</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content with Animated Background */}
          <main className="flex-1 p-8 relative overflow-auto bg-gradient-to-br from-[#252A34] to-[#1a1d23]">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-40 right-20 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-1/2 w-36 h-36 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto">
              {activeTab === 'dashboard' && (
                <div className="animate-fadeIn">
                  <DashboardOverview onQuickAction={handleQuickAction} />
                </div>
              )}

              {activeTab === 'income' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fadeIn">
                  <div>
                    <IncomeForm />
                  </div>
                  <div>
                    <TransactionList />
                  </div>
                </div>
              )}

              {activeTab === 'expenses' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fadeIn">
                  <div>
                    <ExpenseForm />
                  </div>
                  <div>
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
                  <div>
                    <ExpenseChart />
                  </div>
                  <div>
                    <BudgetSummary />
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="animate-fadeIn">
                  <UserProfile />
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
