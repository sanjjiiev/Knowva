import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ActivitiesChartCard() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      // Destroy existing chart to prevent re-rendering issues
      if (window.myChart) {
        window.myChart.destroy();
      }

      window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [{
            label: 'Activity',
            data: [65, 59, 80, 81, 56, 55, 40, 70],
            fill: true,
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return;
              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, 'rgba(76, 175, 80, 0)');
              gradient.addColorStop(1, 'rgba(76, 175, 80, 0.2)');
              return gradient;
            },
            borderColor: '#4CAF50',
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: (context) => {
              if (context.dataIndex === 4) return '#4CAF50';
              return 'transparent';
            },
            pointBorderColor: (context) => {
              if (context.dataIndex === 4) return '#fff';
              return 'transparent';
            },
            pointHoverRadius: 8,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(43, 46, 66, 0.9)',
              titleColor: '#fff',
              bodyColor: '#e0e0e0',
              borderColor: 'var(--primary-color)',
              borderWidth: 1,
              cornerRadius: 8,
            }
          },
          scales: {
            x: {
              grid: { display: false, drawBorder: false },
              ticks: {
                color: 'var(--light-text-color)',
                font: { size: 13, family: 'Poppins' }
              }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.08)', drawBorder: false },
              ticks: {
                color: 'var(--light-text-color)',
                font: { size: 13, family: 'Poppins' },
                maxTicksLimit: 5,
              }
            }
          }
        }
      });
    }
  }, []);

  return (
    <div className="card activities-card">
      <div className="card-header">
        <h3>Activities</h3>
        <div className="dots-menu"><i className="fas fa-ellipsis-h"></i></div>
      </div>
      <div className="chart-container">
        <canvas id="activitiesChart" ref={chartRef}></canvas>
      </div>
      <div className="chart-time-nav">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span className="active">May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
      </div>
    </div>
  );
}

export default ActivitiesChartCard;