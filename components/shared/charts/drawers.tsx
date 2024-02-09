"use client";
import { useEffect, useRef } from "react";
import Chart, { ChartOptions, Plugin } from 'chart.js/auto';
import { DeepPartial } from 'utility-types';


interface CustomPluginOptions {
  color: string;
}
type CustomChartOptions = DeepPartial<ChartOptions<'line'>> & {
  plugins?: {
    customCanvasBackgroundColor?: CustomPluginOptions;
  };
};

type LineChartDataType = {
  title: string;
  labels: string[];
  data: number[];
}

export const useDrawChart = ({ data, labels, title }: LineChartDataType) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy the previous chart instance, if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const plugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart: any, args: any, options: any) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#00668c');
    gradient.addColorStop(1, '#ffffff00');

    // Create a new Chart instance and save a reference to it
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...labels],
        datasets: [{
          label: title,
          data: [...data],
          borderWidth: 1,
          borderColor: '#004761',
          backgroundColor: gradient,
          fill: true,
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          pointStyle: false,

        },]
      },
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: '#ffffff',
          } as CustomPluginOptions,
          legend: {
            labels: {
              font: {
                size: 12,
                family: 'Montserrat',
              }
            }
          },
        },
      } as CustomChartOptions,
      plugins: [plugin],
    });

    chartInstanceRef.current = newChartInstance;

  }, [data]); // Add data as a dependency if needed

  return { chartRef };
};
