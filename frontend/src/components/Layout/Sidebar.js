import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Package, Sparkles, User } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/my-routine', icon: ClipboardList, label: 'My Routine' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/product-analyzer', icon: Sparkles, label: 'Product Analyzer' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">✨</span>
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
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
