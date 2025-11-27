import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('login');
  const { user } = useAuth();

  // If user is logged in, show appropriate dashboard
  if (user) {
    // Check user role from session storage
    const userRole = sessionStorage.getItem('userRole');
    if (userRole === 'admin') {
      return <AdminDashboard />;
    }
    return <Dashboard />;
  }

  // If user is not logged in, show login/register pages
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center px-4">
        <div className="w-full max-w-md card animate-fadeIn">
          <Login onLoginSuccess={() => setCurrentPage('dashboard')} />
          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentPage('register')}
              className="btn-outline w-full mt-2"
            >
              Don't have an account? <span className="theme-accent">Register</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'register') {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center px-4">
        <div className="w-full max-w-md card animate-fadeIn">
          <Register onRegisterSuccess={() => setCurrentPage('dashboard')} />
          <div className="text-center mt-6">
            <button
              onClick={() => setCurrentPage('login')}
              className="btn-outline w-full mt-2"
            >
              Already have an account? <span className="theme-accent">Login</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
