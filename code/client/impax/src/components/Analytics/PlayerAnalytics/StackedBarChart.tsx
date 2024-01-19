import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";

export const StackedBarChart = () => {
  const xVals = [10, 30, 50, 70, 90, 110, 130, 150, 170, 190];
  const yVals = [5, 8, 24, 16, 32, 42, 30, 17, 11];
  const data = xVals.map((k, i) => ({ x: k, y: yVals[i] }));

  const backgroundColor = Array(xVals.length).fill("rgba(255, 99, 132, 0.2)");
  const borderColor = Array(xVals.length).fill("rgba(255, 99, 132, 1)");

  // Prepare the data for the chart
  const chartData = {
    datasets: [
      {
        label: "Num of Visitors",
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 5,
      },
    ],
  };

  // Define the chart options

  const chartOptions: ChartOptions<"bar"> = {
    scales: {
      x: {
        type: "linear",
        offset: false,
        grid: {
          offset: false,
          display: true,
        },
        ticks: {
          stepSize: 20,
        },
        title: {
          display: true,
          text: "Hours",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Visitors",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            if (!items.length) {
              return "";
            }
            const item = items[0];
            const x = item.parsed.x;
            const min = x - 10;
            const max = x + 10;
            return `Magnitude: ${min} - ${max}`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};
