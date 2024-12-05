'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  data: { name: string; data: { x: string; y: number }[] }[]; // Format series
  sensorName: string;
}

const Chart: React.FC<ChartProps> = ({ data, sensorName }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        <p>Data tidak tersedia atau sedang dimuat.</p>
      </div>
    );
  }

  const chartOptions: ApexOptions = {
    chart: {
      id: 'sensor-data-chart',
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    title: {
      text: `Sensor Data: ${sensorName}`,
      align: 'center',
    },
    xaxis: {
      type: 'datetime',
      title: { text: 'Timestamp' },
    },
    yaxis: {
      title: { text: 'Sensor Values' },
    },
    dataLabels: { enabled: false },
    tooltip: { shared: true, intersect: false },
    stroke: { curve: 'smooth', width: 2 },
    legend: { show: true, position: 'top' },
  };

  return (
    <div className="chart-container">
      <ReactApexChart options={chartOptions} series={data} type="bar" height={550} />
    </div>
  );
};

export default Chart;
