// WeeklyAppointmentsChart.jsx
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import Chart from 'chart.js/auto';

const WeeklyAppointmentsChart = ({ appointments }) => {
  const chartRef = useRef(null); // Reference to store the chart instance

  // Get the last 7 days
  const today = dayjs();
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    today.subtract(i, 'day').format('YYYY-MM-DD')
  ).reverse();

  // Count appointments for each day
  const appointmentsCount = last7Days.map((date) =>
    appointments.filter(
      (appt) => dayjs(appt.date).format('YYYY-MM-DD') === date
    ).length
  );

  // Chart data and options
  const data = {
    labels: last7Days.map((date) => dayjs(date).format('ddd - DD')),
    datasets: [
      {
        label: 'Appointments',
        data: appointmentsCount,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Check if the chartRef is set before accessing its properties
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [appointments]);

  return (
    <div className="w-5/6 bg-white p-4 rounded-lg shadow-lg my-6">
      <h3 className="text-xl font-semibold mb-4">Weekly Appointments Overview</h3>
      {data && (
        <Line
          ref={chartRef}
          data={data}
          options={options}
        />
      )}
    </div>
  );
};

export default WeeklyAppointmentsChart;