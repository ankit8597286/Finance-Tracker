"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function ExpenseChart({ expenses }) {
  // Group by category
  const categoryMap = {};

  expenses.forEach((item) => {
    if (categoryMap[item.category]) {
      categoryMap[item.category] += item.amount;
    } else {
      categoryMap[item.category] = item.amount;
    }
  });

  const labels = Object.keys(categoryMap);
  const values = Object.values(categoryMap);

  // 🎨 Premium Color Palette
  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6", // purple
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        backgroundColor: colors,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151", // gray-700
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
          font: { weight: "bold" },
        },
      },
      y: {
        ticks: {
          color: "#374151",
          font: { weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full">
      
      {/* Title */}
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
        Expense Analytics
      </h2>

      {/* Charts Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-sm sm:text-base font-semibold text-gray-600 mb-2">
            Category Split
          </h3>

          <div className="w-full h-[220px] sm:h-[260px] md:h-[280px]">
            <Pie data={data} options={options} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-sm sm:text-base font-semibold text-gray-600 mb-2">
            Category Comparison
          </h3>

          <div className="w-full h-[220px] sm:h-[260px] md:h-[280px]">
            <Bar data={data} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
}