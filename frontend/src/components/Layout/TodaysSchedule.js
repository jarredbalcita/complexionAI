import React from 'react';
import { Calendar, Sun, Moon, Sparkles } from 'lucide-react';
import Card from '../UI/Card';
import './TodaysSchedule.css';

const TodaysSchedule = () => {
  const schedule = [
    {
      time: '7:00 AM',
      icon: Sun,
      title: 'Morning Skincare Routine',
      subtitle: '4 steps • 8 min',
    },
    {
      time: '9:00 PM',
      icon: Moon,
      title: 'Evening Skincare Routine',
      subtitle: '5 steps • 12 min',
    },
    {
      time: '10:00 PM',
      icon: Sparkles,
      title: 'Apply Retinol Serum',
      subtitle: 'Treatment night',
    },
  ];

  return (
    <div className="todays-schedule">
      <div className="schedule-header">
        <Calendar size={20} className="schedule-header-icon" />
        <h3>Today's Schedule</h3>
      </div>

      <div className="schedule-list">
        {schedule.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} padding="md" className="schedule-item" hover>
              <div className="schedule-time">
                <Icon size={18} />
                <span>{item.time}</span>
              </div>
              <h4 className="schedule-title">{item.title}</h4>
              <p className="schedule-subtitle">{item.subtitle}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TodaysSchedule;
