'use client';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function Chart() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const chart = echarts.init(ref.current);
      chart.setOption({
        xAxis: { type: 'category', data: ['A', 'B', 'C'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [5, 20, 36] }]
      });
      return () => {
        chart.dispose();
      };
    }
  }, []);

  return <div ref={ref} style={{ width: '100%', height: 400 }} />;
}
