import { useContext, useEffect } from 'react';

import { Chart, registerables } from 'chart.js/auto';
import { SocketContext } from '../context/SocketContext';

Chart.register(...registerables);
let myChart;

export const BandChart = () => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      crearGrafica(bands);
    });
    return () => socket.off('current-bands');
  }, [socket]);

  const crearGrafica = (bands = []) => {
    const ctx = document.getElementById('myChart');
    if (typeof myChart !== 'undefined') myChart.destroy();

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: '# of Votes',
            data: bands.map((band) => band.votes),
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  };

  return <canvas id='myChart' height='50'></canvas>;
};
