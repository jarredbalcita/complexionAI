import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TodaysSchedule from './TodaysSchedule';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <TodaysSchedule />
    </div>
  );
};

export default AppLayout;
