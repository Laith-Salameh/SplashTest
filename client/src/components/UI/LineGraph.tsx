"use client"
import React, { useState, useEffect, useRef } from 'react';
import { animator, Chart, Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables); // Register Chart.js components

interface GraphProps {
  maxValue: number; 
  duration: number; 
}

const initData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: '#c42175',
      pointRadius: 0, 
    },
  ],
}



const ExponentialGraph: React.FC<GraphProps> = ({ maxValue = 10, duration }) => {
  const [data, setData] = useState<any>(initData);
  const charRef = useRef<Chart>(null);

  useEffect(() => {
    const startTime = performance.now();
    const endTime = startTime + duration;

    const updateData = () => {
      const now = performance.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);

      const currentValue = maxValue * (1 - Math.sqrt(1 - progress));

      setData((prevData) => ({
        labels: [...prevData.labels, (progress * 10).toFixed(2)],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, currentValue],
          },
        ],
      }));
      charRef.current?.update()

      if (progress < 1) {
        charRef?.current?.update()
        window.requestAnimationFrame(updateData);
      }
    };

    updateData();

    return () => {
      window.cancelAnimationFrame(updateData);
      setData(initData)
      charRef?.current?.update()
    }
  }, [maxValue, duration]);

  const options = {
    events: [],
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      x: {
        
        title: {
          display: false,
        },
        ticks: {
          display: false 
        },
        grid: {
          display: false, 
        },
      },
      y: {
        title: {
          display: false,
        },
        ticks: {
          display: false, 
        },
        grid: {
          display: false, 
        },
        max: 10
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: false, 
      },
    },
    animation: {
     duration : 0
    },
  };
  return <Line ref={charRef} data={data} options={options}/>;
};

export default ExponentialGraph;
