'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
  data: {
    ds_id: string;
    sensor_name: string;
    read_date: string;
    read_value: string;
  }[]; // Data dari API
  sensorName: string;
}

const Chart: React.FC<ChartProps> = ({ data, sensorName }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>Loading or No Data Available...</div>; // Tampilkan pesan loading jika data kosong
  }

  // Kelompokkan data berdasarkan sensor_name
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.sensor_name]) {
      acc[item.sensor_name] = [];
    }
    acc[item.sensor_name].push({
      x: item.read_date, // Timestamp
      y: parseFloat(item.read_value), // Nilai sensor
    });
    return acc;
  }, {} as Record<string, { x: string; y: number }[]>);

  // Ubah groupedData menjadi format series untuk ApexCharts
  const series = Object.entries(groupedData).map(([sensorName, readings]) => ({
    name: sensorName,
    data: readings,
  }));

  // Konfigurasi opsi chart
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div id="sensor-chart">
        <ReactApexChart options={chartOptions} series={series} type="line" height={550} />
      </div>
    </div>
  );
};

export default Chart;
