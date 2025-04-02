import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { fetchTopUsers } from '../api';
import { Trophy, Medal } from 'lucide-react';

const TopUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchTopUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching top users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        Top Contributors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <Medal className="text-indigo-500" size={16} />
                  {user.postCount} posts
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUsers;