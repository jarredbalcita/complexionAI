import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Package, Sparkles, User, LogOut, Leaf } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/my-routine', icon: ClipboardList, label: 'My Routine' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/product-analyzer', icon: Sparkles, label: 'Product Analyzer' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-mark">
            <Leaf size={15} />
          </div>
          <span className="logo-text">ComplexionAI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
            >
              <Icon size={17} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item signout-btn" onClick={handleSignOut}>
          <LogOut size={17} className="nav-icon" />
          <span className="nav-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
