import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Stats() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['HTML', 'CSS', 'JS', 'React', 'Python', 'C#'],
        datasets: [
          {
            data: [90, 85, 80, 70, 60, 60],
            backgroundColor: '#0ef',
          },
        ],
      },
      options: {
        animation: { duration: 2000 },
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 100 } },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <section className="stats" id="stats">
      <h2 className="heading">My <span>Stats</span></h2>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </section>
  );
}
