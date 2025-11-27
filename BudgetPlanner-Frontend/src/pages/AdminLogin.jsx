import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = ({ onLoginSuccess }) => {
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAdmin({ ...admin, [id]: value });
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!admin.username || !admin.password) {
      setError('Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      const result = await adminLogin(admin);
      
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error || 'Admin login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 shadow-2xl animate-slideInUp">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-400 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl">🔐</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
        <p className="text-blue-100">Sign in with your admin credentials</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}
        
        <div className="relative">
          <label className="block text-sm font-semibold text-blue-100 mb-2">
            Admin Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              value={admin.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-blue-200 transition-all duration-300"
              placeholder="Enter admin username"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-semibold text-blue-100 mb-2">
            Admin Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={admin.password}
              id="password"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-blue-200 transition-all duration-300"
              placeholder="Enter admin password"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-orange-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Signing In...' : 'Sign In as Admin'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
