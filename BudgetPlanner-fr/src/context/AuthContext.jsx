import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        sessionStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Accepts a user object { username, password }
  const login = async (userObj) => {
    try {
      setLoading(true);
      const userData = await apiService.login(userObj);
      // Debug log to check user object and role
      console.log('Login response userData:', userData);
      // Save user data
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const newUser = await apiService.register(userData);
      
      // Auto-login after successful registration
      setUser(newUser);
      sessionStorage.setItem('user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear all session storage items
    sessionStorage.clear();
    window.location.href = '/';
  };

  const updateUserProfile = async (userId, userData) => {
    try {
      setLoading(true);
      const updatedUser = await apiService.updateUser(userId, userData);
      
      // Update user data in state and session storage
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
