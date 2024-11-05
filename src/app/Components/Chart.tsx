'use client'

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Generate dummy data for environmental metrics for 3 days (72 hours)
const generateDummyData = (hours: number) => {
  const humidity = Array.from({ length: hours }, () => Math.floor(Math.random() * 100));
  const brightness = Array.from({ length: hours }, () => Math.floor(Math.random() * 150));
  const rainfall = Array.from({ length: hours }, () => Math.floor(Math.random() * 50));
  const temperature = Array.from({ length: hours }, () => Math.floor(Math.random() * 40));
  const windSpeed = Array.from({ length: hours }, () => Math.floor(Math.random() * 20));
  return { humidity, brightness, rainfall, temperature, windSpeed };
};

// Format date and time for the last 3 days
const formatTimestamps = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 3); // Start from 3 days ago
  const timestamps = [];

  for (let i = 0; i < 3 * 24; i++) { // 3 days * 24 hours
    const date = new Date(startDate.getTime() + (i * 60 * 60 * 1000)); // Add i hours
    const formattedDate = date.toLocaleString('id-ID', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
    timestamps.push(formattedDate);
  }

  return timestamps; // Return timestamps for the last 3 days
};

const { humidity, brightness, rainfall, temperature, windSpeed } = generateDummyData(3 * 24); // 3 days * 24 hours
const timestamps = formatTimestamps();

const EnvironmentalDataBarChart: React.FC = () => {
  // Chart options configuration
  const chartOptions: ApexOptions = {
    chart: {
      id: 'environmental-data-bar-chart',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: 'Data Lingkungan dari 3 hari terakhir',
      align: 'center',
    },
    xaxis: {
      categories: timestamps, // Use formatted timestamps
      labels: {
        rotate: -45, // Rotate labels for better readability
      },
    },
    colors: ['#1D4ED8', '#6B46C1', '#FBBF24', '#34D399', '#EF4444'], // Tailwind colors for different metrics
    legend: {
      show: true,
      position: 'top',
    },
    stroke: {
      width: 0, // Set width to 0 for bar charts
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '70%', // Adjust column width
        borderRadius: 5,
      },
    },
  };

  const series = [
    {
      name: 'Kelembapan Lingkungan',
      data: humidity,
    },
    {
      name: 'Kecerahan',
      data: brightness,
    },
    {
      name: 'Curah Hujan',
      data: rainfall,
    },
    {
      name: 'Suhu Lingkungan',
      data: temperature,
    },
    {
      name: 'Kecepatan Angin',
      data: windSpeed,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Chart */}
      <div id="hs-multiple-bar-chart">
        <ReactApexChart options={chartOptions} series={series} type="bar" height={550} />
      </div>
    </div>
  );
};

export default EnvironmentalDataBarChart;
