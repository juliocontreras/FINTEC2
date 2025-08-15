'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useStore } from '../store/useStore';
import CollapsibleCard from './CollapsibleCard';

export default function WealthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const data = useStore((s) => s.patrimonio_simulado);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const option: echarts.EChartsOption = {
      xAxis: { type: 'category', data: data.map((p) => p.date) },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'line',
          data: data.map((p) => p.value),
          smooth: true,
          showSymbol: false
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
  }, [data]);

  return (
    <CollapsibleCard title="Gráfico de patrimonio">
      <div ref={ref} className="w-full h-80" />
    </CollapsibleCard>
  );
}

