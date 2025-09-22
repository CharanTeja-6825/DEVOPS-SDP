import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import apiService from '../services/api';

// Create context
const BudgetContext = createContext();

// Initial state
const initialState = {
  income: [],
  expenses: [],
  savingsGoals: [],
  loading: false,
  categories: [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ]
};

// Action types
const ACTION_TYPES = {
  SET_INCOME: 'SET_INCOME',
  SET_EXPENSES: 'SET_EXPENSES',
  SET_SAVINGS_GOALS: 'SET_SAVINGS_GOALS',
  ADD_INCOME: 'ADD_INCOME',
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_SAVINGS_GOAL: 'ADD_SAVINGS_GOAL',
  DELETE_INCOME: 'DELETE_INCOME',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  DELETE_SAVINGS_GOAL: 'DELETE_SAVINGS_GOAL',
  UPDATE_SAVINGS_GOAL: 'UPDATE_SAVINGS_GOAL',
  SET_LOADING: 'SET_LOADING'
};

// Reducer function
const budgetReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ACTION_TYPES.SET_INCOME:
      return {
        ...state,
        income: action.payload
      };
    case ACTION_TYPES.SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case ACTION_TYPES.SET_SAVINGS_GOALS:
      return {
        ...state,
        savingsGoals: action.payload
      };
    case ACTION_TYPES.ADD_INCOME:
      return {
        ...state,
        income: [...state.income, action.payload]
      };
    case ACTION_TYPES.ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    case ACTION_TYPES.ADD_SAVINGS_GOAL:
      return {
        ...state,
        savingsGoals: [...state.savingsGoals, action.payload]
      };
    case ACTION_TYPES.DELETE_INCOME:
      return {
        ...state,
        income: state.income.filter(item => item.id !== action.payload)
      };
    case ACTION_TYPES.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(item => item.id !== action.payload)
      };
    case ACTION_TYPES.DELETE_SAVINGS_GOAL:
      return {
        ...state,
        savingsGoals: state.savingsGoals.filter(goal => goal.id !== action.payload)
      };
    case ACTION_TYPES.UPDATE_SAVINGS_GOAL:
      return {
        ...state,
        savingsGoals: state.savingsGoals.map(goal =>
          goal.id === action.payload.id
            ? { ...goal, ...action.payload.updates }
            : goal
        )
      };
    default:
      return state;
  }
};

// Context provider component
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const { user } = useAuth();

  // Load data when component mounts or user changes
  useEffect(() => {
    if (user && user.id) {
      loadAllData();
    }
  }, [user]);

  const loadAllData = async () => {
    if (!user || !user.id) return;
    
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
    try {
      const [incomeData, expenseData, goalsData] = await Promise.all([
        apiService.getAllIncomes(user.id),
        apiService.getAllExpenses(user.id),
        apiService.getAllSavingGoals(user.id)
      ]);

      dispatch({ type: ACTION_TYPES.SET_INCOME, payload: incomeData });
      dispatch({ type: ACTION_TYPES.SET_EXPENSES, payload: expenseData });
      dispatch({ type: ACTION_TYPES.SET_SAVINGS_GOALS, payload: goalsData });
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    }
  };

  // Helper functions
  const addIncome = async (incomeData) => {
    if (!user || !user.id) return;
    
    try {
      const newIncome = await apiService.createIncome({
        ...incomeData,
        userId: user.id
      });
      dispatch({ type: ACTION_TYPES.ADD_INCOME, payload: newIncome });
    } catch (error) {
      console.error('Failed to add income:', error);
      throw error;
    }
  };

  const addExpense = async (expenseData) => {
    if (!user || !user.id) return;
    
    try {
      const newExpense = await apiService.createExpense({
        ...expenseData,
        userId: user.id
      });
      dispatch({ type: ACTION_TYPES.ADD_EXPENSE, payload: newExpense });
    } catch (error) {
      console.error('Failed to add expense:', error);
      throw error;
    }
  };

  const addSavingsGoal = async (goalData) => {
    if (!user || !user.id) return;
    
    try {
      const newGoal = await apiService.createSavingGoal({
        goalname: goalData.name,
        targetamount: goalData.targetAmount,
        currentamount: goalData.currentAmount || 0,
        deadlinedate: goalData.deadline,
        userId: user.id
      });
      dispatch({ type: ACTION_TYPES.ADD_SAVINGS_GOAL, payload: newGoal });
    } catch (error) {
      console.error('Failed to add savings goal:', error);
      throw error;
    }
  };

  const deleteIncome = async (id) => {
    if (!user || !user.id) return;
    
    try {
      await apiService.deleteIncome(user.id, id);
      dispatch({ type: ACTION_TYPES.DELETE_INCOME, payload: id });
    } catch (error) {
      console.error('Failed to delete income:', error);
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    if (!user || !user.id) return;
    
    try {
      await apiService.deleteExpense(user.id, id);
      dispatch({ type: ACTION_TYPES.DELETE_EXPENSE, payload: id });
    } catch (error) {
      console.error('Failed to delete expense:', error);
      throw error;
    }
  };

  const deleteSavingsGoal = async (id) => {
    if (!user || !user.id) return;
    
    try {
      await apiService.deleteSavingGoal(user.id, id);
      dispatch({ type: ACTION_TYPES.DELETE_SAVINGS_GOAL, payload: id });
    } catch (error) {
      console.error('Failed to delete savings goal:', error);
      throw error;
    }
  };

  const updateSavingsGoal = async (id, updates) => {
    if (!user || !user.id) return;
    
    try {
      if (updates.currentAmount !== undefined) {
        // Add amount to goal
        const goal = state.savingsGoals.find(g => g.id === id);
        if (goal) {
          const newAmount = updates.currentAmount - (goal.currentamount || 0);
          if (newAmount > 0) {
            await apiService.addAmountToGoal(user.id, id, newAmount);
          }
        }
      }
      dispatch({ type: ACTION_TYPES.UPDATE_SAVINGS_GOAL, payload: { id, updates } });
    } catch (error) {
      console.error('Failed to update savings goal:', error);
      throw error;
    }
  };

  // Calculate totals
  const getTotalIncome = () => {
    return state.income.reduce((total, item) => total + (item.amount || 0), 0);
  };

  const getTotalExpenses = () => {
    return state.expenses.reduce((total, item) => total + (item.amount || 0), 0);
  };

  const getRemainingBudget = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    state.expenses.forEach(expense => {
      const category = expense.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + (expense.amount || 0);
    });
    return categoryTotals;
  };

  const value = {
    ...state,
    addIncome,
    addExpense,
    addSavingsGoal,
    deleteIncome,
    deleteExpense,
    deleteSavingsGoal,
    updateSavingsGoal,
    getTotalIncome,
    getTotalExpenses,
    getRemainingBudget,
    getExpensesByCategory,
    loadAllData
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook to use the budget context
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
