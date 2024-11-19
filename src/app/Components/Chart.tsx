'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface EnvironmentalDataBarChartProps {
  data: any[]; // Data dari API
}

// Function to preprocess data
const preprocessData = (data: any[]) => {
  const groupedData: Record<string, any> = {};

  // Group data by timestamp
  data.forEach((item) => {
    const { read_date, ds_id, read_value } = item;
    if (!groupedData[read_date]) {
      groupedData[read_date] = { hum: null, ilum: null, rain: null, temp: null, wind: null };
    }
    groupedData[read_date][ds_id] = parseFloat(read_value);
  });

  // Extract timestamps and data for each series
  const timestamps = Object.keys(groupedData);
  const humidity = timestamps.map((time) => groupedData[time].hum);
  const brightness = timestamps.map((time) => groupedData[time].ilum);
  const rainfall = timestamps.map((time) => groupedData[time].rain);
  const temperature = timestamps.map((time) => groupedData[time].temp);
  const windSpeed = timestamps.map((time) => groupedData[time].wind);

  return { timestamps, humidity, brightness, rainfall, temperature, windSpeed };
};

const EnvironmentalDataBarChart: React.FC<EnvironmentalDataBarChartProps> = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>Loading...</div>; // Tampilkan pesan loading jika data kosong
  }

  const { timestamps, humidity, brightness, rainfall, temperature, windSpeed } = preprocessData(data);

  const chartOptions: ApexOptions = {
    chart: {
      id: 'environmental-data-bar-chart',
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    title: {
      text: 'Data Lingkungan',
      align: 'center',
    },
    xaxis: {
      categories: timestamps,
      labels: { rotate: -45 },
    },
    colors: ['#1D4ED8', '#6B46C1', '#FBBF24', '#34D399', '#EF4444'],
    legend: { show: true, position: 'top' },
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    tooltip: { shared: true, intersect: false },
    plotOptions: {
      bar: {
        columnWidth: '70%',
        borderRadius: 5,
      },
    },
  };

  const series = [
    { name: 'Kelembapan Lingkungan', data: humidity },
    { name: 'Kecerahan', data: brightness },
    { name: 'Curah Hujan', data: rainfall },
    { name: 'Suhu Lingkungan', data: temperature },
    { name: 'Kecepatan Angin', data: windSpeed },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div id="hs-multiple-bar-chart">
        <ReactApexChart options={chartOptions} series={series} type="bar" height={550} />
      </div>
    </div>
  );
};

export default EnvironmentalDataBarChart;
