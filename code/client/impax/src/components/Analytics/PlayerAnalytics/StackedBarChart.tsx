import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";
import { HistogramData } from "../../../types";

export const StackedBarChart: React.FC<HistogramData> = ({
  left,
  right,
  front,
  back,
}) => {
  const xVals = [10, 30, 50, 70, 90, 110, 130, 150, 170, 190];

  // const yValsLeft = [5, 8, 24, 16, 32, 42, 30, 17, 11, 2];
  // const arraySize = yValsLeft.length;

  // const yValsRight = Array.from({ length: arraySize }, () =>
  //   Math.floor(Math.random() * 50)
  // );
  // const yValsFront = Array.from({ length: arraySize }, () =>
  //   Math.floor(Math.random() * 50)
  // );
  // const yValsBack = Array.from({ length: arraySize }, () =>
  //   Math.floor(Math.random() * 50)
  // );

  const dataLeft = xVals.map((k, i) => ({ x: k, y: left[i] }));
  const dataRight = xVals.map((k, i) => ({ x: k, y: right[i] }));
  const dataFront = xVals.map((k, i) => ({ x: k, y: front[i] }));
  const dataBack = xVals.map((k, i) => ({ x: k, y: back[i] }));

  const backgroundColorLeft = Array(xVals.length).fill(
    "rgba(255, 99, 180, 0.2)"
  );
  const backgroundColorRight = Array(xVals.length).fill("rgb(65, 22, 38)");
  const backgroundColorFront = Array(xVals.length).fill("rgb(46, 22, 38)");
  const backgroundColorBack = Array(xVals.length).fill(
    "rgba(104, 31, 58, 0.5)"
  );

  const borderColorLeft = Array(xVals.length).fill("rgba(255, 99, 132, 1)");
  const borderColorRight = Array(xVals.length).fill("rgba(255, 99, 132, 1)");
  const borderColorFront = Array(xVals.length).fill("rgba(255, 99, 132, 1)");
  const borderColorBack = Array(xVals.length).fill("rgba(255, 99, 132, 1)");

  // Prepare the data for the chart
  const chartData = {
    datasets: [
      {
        label: "Left",
        data: dataLeft,
        backgroundColor: backgroundColorLeft,
        borderColor: borderColorLeft,
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 5,
      },
      {
        label: "Right",
        data: dataRight,
        backgroundColor: backgroundColorRight,
        borderColor: borderColorRight,
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 5,
      },
      {
        label: "Front",
        data: dataFront,
        backgroundColor: backgroundColorFront,
        borderColor: borderColorFront,
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 5,
      },
      {
        label: "Back",
        data: dataBack,
        backgroundColor: backgroundColorBack,
        borderColor: borderColorBack,
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 5,
      },
    ],
  };

  // Define the chart options

  const chartOptions: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
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
          text: "Magnitude",
          font: {
            size: 16,
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Num of impacts",
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      // title: {
      //   display: true,
      //   text: "Impact Histogram",
      //   font: {
      //     size: 16,
      //   },
      // },
      legend: {
        display: false,
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
