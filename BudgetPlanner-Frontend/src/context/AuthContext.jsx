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

  // User login - for normal users only
  const login = async (userObj) => {
    try {
      setLoading(true);
      const userData = await apiService.login(userObj);
      console.log('User login response:', userData);
      // Save user data
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('userType', 'user');
      return { success: true, user: userData };
    } catch (error) {
      console.error('User login failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Admin login - for administrators only
  const adminLogin = async (adminObj) => {
    try {
      setLoading(true);
      const adminData = await apiService.adminLogin(adminObj);
      console.log('Admin login response:', adminData);
      // Save admin data
      setUser(adminData);
      sessionStorage.setItem('user', JSON.stringify(adminData));
      sessionStorage.setItem('userType', 'admin');
      return { success: true, user: adminData };
    } catch (error) {
      console.error('Admin login failed:', error);
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
    <AuthContext.Provider value={{ user, login, adminLogin, register, logout, updateUserProfile, loading }}>
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
