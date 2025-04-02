import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, TrendingUp, LayoutList } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Social Analytics</h1>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-indigo-200 ${
                isActive ? 'text-indigo-200' : ''
              }`
            }
          >
            <Users size={20} />
            <span>Top Users</span>
          </NavLink>
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-indigo-200 ${
                isActive ? 'text-indigo-200' : ''
              }`
            }
          >
            <TrendingUp size={20} />
            <span>Trending</span>
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-indigo-200 ${
                isActive ? 'text-indigo-200' : ''
              }`
            }
          >
            <LayoutList size={20} />
            <span>Feed</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;