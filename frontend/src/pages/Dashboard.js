import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      label: 'ROUTINES CREATED',
      value: '3',
      description: 'Morning, Evening, Weekly',
      color: 'primary',
    },
    {
      label: 'PRODUCTS ANALYZED',
      value: '24',
      description: '+6 this week',
      color: 'accent',
      trend: true,
    },
  ];

  const routines = [
    {
      title: 'Morning Routine',
      time: 'AM',
      steps: [
        '1. Cleanser',
        '2. Vitamin C Serum',
        '3. Moisturizer',
        '4. SPF 50',
      ],
    },
    {
      title: 'Evening Routine',
      time: 'PM',
      steps: [
        '1. Oil Cleanser',
        '2. Water Cleanser',
        '3. Retinol',
        '4. Night Cream',
      ],
    },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's your skincare overview</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Card key={index} padding="lg" className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-value stat-value-${stat.color}`}>
              {stat.value}
            </div>
            <div className="stat-description">
              {stat.trend && <TrendingUp size={16} className="stat-trend" />}
              {stat.description}
            </div>
          </Card>
        ))}
      </div>

      <Card padding="lg" className="routines-section">
        <div className="section-header">
          <h2>Your Routines</h2>
          <Link to="/my-routine" className="view-all-link">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="routines-grid">
          {routines.map((routine, index) => (
            <Card key={index} padding="lg" className="routine-card" hover>
              <div className="routine-header">
                <h3>{routine.title}</h3>
                <span className={`routine-badge routine-badge-${routine.time.toLowerCase()}`}>
                  {routine.time}
                </span>
              </div>
              <ul className="routine-steps">
                {routine.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
