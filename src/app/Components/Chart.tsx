'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  data: { read_date: string; read_value: string }[]; // Data dari API
  sensorName: string; // Nama sensor yang dipilih
}

// Function to preprocess data
const preprocessData = (data: { read_date: string; read_value: string }[]) => {
  // Map timestamp dan nilai
  const timestamps = data.map((item) => item.read_date);
  const values = data.map((item) => parseFloat(item.read_value));

  return { timestamps, values };
};

const Chart: React.FC<ChartProps> = ({ data, sensorName }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>Loading or No Data Available...</div>; // Tampilkan pesan loading jika data kosong
  }

  // Preprocess data
  const { timestamps, values } = preprocessData(data);

  // Konfigurasi opsi chart
  const chartOptions: ApexOptions = {
    chart: {
      id: 'sensor-data-chart',
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    title: {
      text: `Sensor Data: ${sensorName}`, // Menggunakan nama sensor untuk judul
      align: 'center',
    },
    xaxis: {
      categories: timestamps,
      labels: { rotate: -45 },
      title: {
        text: 'Timestamp',
        style: { fontWeight: 'bold' },
      },
    },
    yaxis: {
      title: {
        text: 'Sensor Values',
        style: { fontWeight: 'bold' },
      },
    },
    colors: ['#34D399'], // Warna data
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
  };

  // Series data
  const series = [
    {
      name: 'Sensor Value',
      data: values,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div id="sensor-chart">
        <ReactApexChart options={chartOptions} series={series} type="line" height={550} />
      </div>
    </div>
  );
};

export default Chart;
