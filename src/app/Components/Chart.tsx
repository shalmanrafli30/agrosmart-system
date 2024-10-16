'use client'

// import React from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { ApexOptions } from 'apexcharts';

// const IncomeOutcomeLineChart: React.FC = () => {
//   // Chart options configuration
//   const chartOptions: ApexOptions = {
//     chart: {
//       id: 'income-outcome-line-chart',
//       toolbar: {
//         show: false,
//       },
//       zoom: {
//         enabled: false, // Disable zooming
//       },
//     },
//     title: {
//       text: 'Income vs Outcome',
//       align: 'center',
//     },
//     xaxis: {
//       categories: ['January', 'February', 'March', 'April', 'May'],
//     },
//     colors: ['#1D4ED8', '#6B46C1'], // Tailwind colors for Income and Outcome
//     legend: {
//       show: false, // Disable default legend
//     },
//     stroke: {
//       curve: 'smooth', // Smooth lines for better visual
//       width: 2, // Line width
//     },
//     dataLabels: {
//       enabled: false, // Disable data labels
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//     },
//   };

//   const series = [
//     {
//       name: 'Income',
//       data: [4000, 5000, 6000, 7000, 8000],
//     },
//     {
//       name: 'Outcome',
//       data: [3000, 4000, 5000, 6000, 7000],
//     },
//   ];

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       {/* Legend Indicator */}
//       <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
//         <div className="inline-flex items-center">
//           <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2" style={{ width: '10px', height: '10px' }}></span>
//           <span className="text-[13px] text-gray-600">
//             Income
//           </span>
//         </div>
//         <div className="inline-flex items-center">
//           <span className="size-2.5 inline-block bg-purple-600 rounded-sm me-2" style={{ width: '10px', height: '10px' }}></span>
//           <span className="text-[13px] text-gray-600">
//             Outcome
//           </span>
//         </div>
//       </div>
//       {/* Chart */}
//       <div id="hs-multiple-line-chart">
//         <ReactApexChart options={chartOptions} series={series} type="line" height={350} />
//       </div>
//     </div>
//   );
// };

// export default IncomeOutcomeLineChart;


import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Generate dummy data for environmental metrics
const generateDummyData = (hours: number) => {
  const humidity = Array.from({ length: hours }, () => Math.floor(Math.random() * 100));
  const brightness = Array.from({ length: hours }, () => Math.floor(Math.random() * 150));
  const rainfall = Array.from({ length: hours }, () => Math.floor(Math.random() * 50));
  const temperature = Array.from({ length: hours }, () => Math.floor(Math.random() * 40));
  const windSpeed = Array.from({ length: hours }, () => Math.floor(Math.random() * 20));
  return { humidity, brightness, rainfall, temperature, windSpeed };
};

// Format date and time for the last week (last 7 days)
const formatTimestamps = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7); // Start from 7 days ago
  const timestamps = [];

  for (let i = 0; i < 7 * 24; i++) { // 7 days * 24 hours
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

  return timestamps; // Return timestamps for the last week
};

const { humidity, brightness, rainfall, temperature, windSpeed } = generateDummyData(7 * 24); // 7 days * 24 hours
const timestamps = formatTimestamps();

const EnvironmentalDataLineChart: React.FC = () => {
  // Chart options configuration
  const chartOptions: ApexOptions = {
    chart: {
      id: 'environmental-data-line-chart',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: 'Data Lingkungan dari 10/10/2024 sampai 16/10/2024',
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
      curve: 'smooth',
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
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
      {/* Legend Indicator */}
      {/* <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2" style={{ width: '10px', height: '10px' }}></span>
          <span className="text-[13px] text-gray-600">
            Kelembapan Lingkungan
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-purple-600 rounded-sm me-2" style={{ width: '10px', height: '10px' }}></span>
          <span className="text-[13px] text-gray-600">
            Kecerahan
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-yellow-500 rounded-sm me-2" style={{ width: '10px', height: '10px' }}></span>
          <span className="text-[13px] text-gray-600">
            Curah Hujan
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-green-500 rounded-sm me-2" style={{ width: '10px', height: '10px' }}></span>
          <span className="text-[13px] text-gray-600">
            Suhu Lingkungan
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-red-500 rounded-sm me-2" style={{ width: '10px', height: '10px' }}></span>
          <span className="text-[13px] text-gray-600">
            Kecepatan Angin
          </span>
        </div>
      </div> */}
      {/* Chart */}
      <div id="hs-multiple-line-chart">
        <ReactApexChart options={chartOptions} series={series} type="line" height={550} />
      </div>
    </div>
  );
};

export default EnvironmentalDataLineChart;
