import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onLoginSuccess }) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [user, setUser] = useState({
    username:"",
    password:"",
  })


  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const {id, value} = e.target;
    setUser({...user, [id]:value});
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user.username || !user.password) {
      setError('Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      const result = await login(user);
      
      if (result.success) {
        // Store user role in session storage
        if (result.user && result.user.role) {
          sessionStorage.setItem('userRole', result.user.role);
        }
        onLoginSuccess();
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card rounded-3xl p-8 animate-fadeIn">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl">💰</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-light/70">Sign in to your account to continue</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="px-4 py-3 rounded-xl text-sm border border-accent/40 bg-accent/10 theme-accent">
            {error}
          </div>
        )}
        
        <div className="relative">
          <label className="block text-sm font-semibold mb-2">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2a3038] border border-[#3a404b] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-light/40"
              placeholder="Enter your username"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={user.password}
              id="password"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2a3038] border border-[#3a404b] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-light/40"
              placeholder="Enter your password"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
