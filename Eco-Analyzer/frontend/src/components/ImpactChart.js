import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ImpactChart = ({ score }) => {
  const data = {
    labels: ['Carbon', 'Water', 'Energy'],
    datasets: [
      {
        label: 'Impact Score',
        data: [score * 0.4, score * 0.3, score * 0.3],
        backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
        borderRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Environmental Impact Breakdown'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default ImpactChart;