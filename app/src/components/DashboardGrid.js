import React from 'react';
import WelcomeCard from './WelcomeCard';
import CalendarCard from './CalendarCard';
import CourseCardsSection from './CourseCardsSection';
import ActivitiesChartCard from './ActivitiesChartCard';
import UpcomingTaskCard from './UpcomingTaskCard';

function DashboardGrid() {
  return (
    <div className="dashboard-grid">
      <WelcomeCard />
      <CalendarCard />
      <CourseCardsSection />
      <ActivitiesChartCard />
      <UpcomingTaskCard />
    </div>
  );
}

export default DashboardGrid;