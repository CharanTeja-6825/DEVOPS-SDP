import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    fullName: user?.fullName || '',
    phone: user?.phone || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.username || !formData.email) {
      setError('Username and email are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateUserProfile(user.id, formData);
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      fullName: user?.fullName || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="card rounded-2xl p-8 animate-fadeIn">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-light/30 border-t-light rounded-full animate-spin"></div>
          <span className="ml-3">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="card rounded-2xl p-8 animate-fadeIn">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">User Profile</h2>
              <p className="text-light/70 text-sm">Manage your account information</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="theme-primary text-sm font-medium">Account Active</span>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="px-4 py-3 rounded-xl text-sm mb-6 border border-accent/40 bg-accent/10 theme-accent">
            {error}
          </div>
        )}
        
        {success && (
          <div className="px-4 py-3 rounded-xl text-sm mb-6 border border-primary/40 bg-primary/10 theme-primary">
            {success}
          </div>
        )}

        {/* Profile Information */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 bg-[#2a3038] border border-[#3a404b] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-light/40 transition-all duration-300 ${
                    !isEditing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
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

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 bg-[#2a3038] border border-[#3a404b] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-light/40 transition-all duration-300 ${
                    !isEditing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-[#3a404b]">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn btn-primary flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-light/30 border-t-light rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Account Information */}
      <div className="card rounded-2xl p-8 animate-fadeIn" style={{ animationDelay: '200ms' }}>
        <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
          <span>📊</span>
          <span>Account Information</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border border-[#3a404b] bg-[#2a3038]">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary/30 rounded-lg flex items-center justify-center">
                <span className="text-sm">📅</span>
              </div>
              <h4 className="font-semibold">Member Since</h4>
            </div>
            <p className="text-light/70 text-sm">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          
          <div className="p-4 rounded-xl border border-[#3a404b] bg-[#2a3038]">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary/30 rounded-lg flex items-center justify-center">
                <span className="text-sm">✅</span>
              </div>
              <h4 className="font-semibold">Account Status</h4>
            </div>
            <p className="theme-primary text-sm">Active</p>
          </div>
          
          <div className="p-4 rounded-xl border border-[#3a404b] bg-[#2a3038]">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-accent/30 rounded-lg flex items-center justifyCenter">
                <span className="text-sm">🔑</span>
              </div>
              <h4 className="font-semibold">User ID</h4>
            </div>
            <p className="theme-accent text-sm">#{user?.id || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;