import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await apiService.getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setDeletingId(id);
      setError('');
      await apiService.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch {
      setError('Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  const renderTable = () => {
    if (loading) {
      return <div className="text-blue-200 text-center py-8">Loading users...</div>;
    }

    if (users.length === 0) {
      return <div className="text-blue-200 text-center py-8">No users found</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white/10 text-blue-100">
            {users
              .filter(({ role }) => role?.toLowerCase() === 'user') // normalize role check
              .map((user) => (
                <tr key={user.id} className="hover:bg-purple-900/20 transition-all">
                  <td className="py-3 px-4 font-mono">{user.id}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.useremail || user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:from-rose-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                    >
                      {deletingId === user.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen gradient-purple flex flex-col items-center justify-center px-4 py-10">
      {/* Navbar */}
      <nav className="w-full max-w-4xl flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl px-8 py-4 shadow-lg">
        <span className="text-2xl font-bold text-white tracking-wide">Admin Dashboard</span>
        <button
          className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white/10 rounded-b-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin User Management</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {renderTable()}
      </div>
    </div>
  );
}

export default AdminDashboard;
