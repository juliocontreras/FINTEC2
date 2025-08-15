'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type DataResult = {
  dates: string[];
  values: number[];
  projectionDates: string[];
  projectionValues: number[];
};

function generateData(): DataResult {
  const start = new Date(2022, 0, 1);
  const now = new Date();
  const dates: string[] = [];
  const values: number[] = [];

  let currentValue = 5000;
  for (const d = new Date(start); d <= now; d.setMonth(d.getMonth() + 1)) {
    dates.push(d.toISOString().slice(0, 7));
    currentValue += 2000 + Math.random() * 3000; // increment between 2k and 5k
    values.push(Math.round(currentValue));
  }

  // projection assuming same pace as last month
  const growth = values.length > 1 ? values[values.length - 1] - values[values.length - 2] : 0;
  const projectionMonths = 12;
  const projectionDates: string[] = [];
  const projectionValues: number[] = [];
  let lastDate = new Date(now);
  let lastValue = values[values.length - 1];
  for (let i = 0; i < projectionMonths; i++) {
    lastDate.setMonth(lastDate.getMonth() + 1);
    projectionDates.push(lastDate.toISOString().slice(0, 7));
    lastValue += growth;
    projectionValues.push(Math.round(lastValue));
  }

  return { dates, values, projectionDates, projectionValues };
}

export default function WealthChart() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = echarts.init(ref.current);

    const { dates, values, projectionDates, projectionValues } = generateData();
    const allDates = [...dates, ...projectionDates];
    const projectionSeriesData = new Array(values.length - 1).fill(null).concat([values[values.length - 1], ...projectionValues]);

    const goals = [10000, 20000, 40000, 80000];
    const markLineData: any = [
      {
        yAxis: 100000,
        lineStyle: { color: '#fbbf24', width: 2 },
        label: { formatter: 'Objetivo 100K€', color: '#fbbf24', position: 'end' }
      },
      ...goals.map((g) => ({
        yAxis: g,
        lineStyle: { color: '#4b5563', type: 'dashed' },
        label: { formatter: `${g / 1000}K€`, color: '#9ca3af', position: 'end' }
      }))
    ];

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      grid: { left: '3%', right: '3%', bottom: '3%', top: '5%', containLabel: true },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (v) => `${v}€`
      },
      xAxis: {
        type: 'category',
        data: allDates,
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#9ca3af' }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#374151' } },
        splitLine: { lineStyle: { color: '#374151' } },
        axisLabel: {
          color: '#9ca3af',
          formatter: (val: number) => `${val / 1000}K`
        }
      },
      series: [
        {
          name: 'Patrimonio',
          type: 'line',
          smooth: true,
          data: values,
          showSymbol: false,
          lineStyle: { color: '#00c9a7', width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0,201,167,0.3)' },
              { offset: 1, color: 'rgba(0,201,167,0)' }
            ])
          },
          markLine: { symbol: 'none', data: markLineData }
        },
        {
          name: 'Proyección',
          type: 'line',
          smooth: true,
          data: projectionSeriesData,
          showSymbol: false,
          connectNulls: true,
          lineStyle: { color: '#3b82f6', type: 'dashed', width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59,130,246,0.25)' },
              { offset: 1, color: 'rgba(59,130,246,0)' }
            ])
          }
        }
      ]
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div ref={ref} className="w-full h-80" />;
}

