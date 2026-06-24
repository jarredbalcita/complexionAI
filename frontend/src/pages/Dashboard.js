import React from 'react';
import { ArrowRight, TrendingUp, ClipboardList, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard = () => {
  const { user } = useAuth();
  const displayName =
    user?.user_metadata?.display_name ||
    user?.email?.split('@')[0] ||
    'there';

  const stats = [
    {
      label: 'Routines Created',
      value: '3',
      description: 'Morning, Evening, Weekly',
      color: 'primary',
      Icon: ClipboardList,
    },
    {
      label: 'Products Analyzed',
      value: '24',
      description: '+6 this week',
      color: 'accent',
      trend: true,
      Icon: Activity,
    },
  ];

  const routines = [
    {
      title: 'Morning Routine',
      time: 'AM',
      steps: ['Cleanser', 'Vitamin C Serum', 'Moisturizer', 'SPF 50'],
    },
    {
      title: 'Evening Routine',
      time: 'PM',
      steps: ['Oil Cleanser', 'Water Cleanser', 'Retinol', 'Night Cream'],
    },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <p className="page-greeting">{getGreeting()}</p>
          <h1>{displayName}</h1>
          <p className="page-subtitle">Here's your skincare overview for today</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.Icon;
          return (
            <Card key={index} padding="lg" className="stat-card">
              <div className={`stat-icon stat-icon-${stat.color}`}>
                <Icon size={18} />
              </div>
              <div className={`stat-value stat-value-${stat.color}`}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">
                {stat.trend && <TrendingUp size={13} className="stat-trend" />}
                {stat.description}
              </div>
            </Card>
          );
        })}
      </div>

      <Card padding="lg" className="routines-section">
        <div className="section-header">
          <h2>Your Routines</h2>
          <Link to="/my-routine" className="view-all-link">
            View All <ArrowRight size={16} />
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
                {routine.steps.map((step, i) => (
                  <li key={i}>{step}</li>
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
