import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Rejestracja elementów wykresu
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CenaZlota = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoldHistory = async () => {
      try {
        // Pobieramy 30 ostatnich notowań dla wykresu
        const response = await fetch('https://api.nbp.pl/api/cenyzlota/last/30?format=json');
        if (!response.ok) throw new Error('Nie udało się pobrać danych.');
        
        const data = await response.json();
        setHistory(data); // Dla wykresu potrzebujemy dat chronologicznie
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldHistory();
  }, []);

  if (loading) return <div className="loader">Pobieranie danych...</div>;
  if (error) return <div className="error">{error}</div>;

  // Przygotowanie danych do wykresu
  const chartData = {
    labels: history.map(item => item.data), // Oś X: Daty
    datasets: [
      {
        label: 'Cena złota (PLN/g)',
        data: history.map(item => item.cena), // Oś Y: Ceny
        borderColor: '#ffd700',
        backgroundColor: 'rgba(255, 215, 0, 0.5)',
        tension: 0.3, // Zakrzywienie linii
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Zmiana ceny złota w ciągu ostatnich 30 dni' },
    },
  };

  const currentPrice = history[history.length - 1];

  return (
    <div className="gold-container">
      <header className="gold-header">
        <h2>💰 Notowania Ceny Złota</h2>
      </header>

      <section className="gold-card">
        <span className="card-label">Aktualna cena</span>
        <h1 className="gold-price">{currentPrice.cena.toFixed(2)} PLN</h1>
        <p className="gold-date">Notowanie z dnia: {currentPrice.data}</p>
      </section>


      <section className="chart-section" style={{ marginTop: '40px', background: 'white', padding: '20px', borderRadius: '10px' }}>
        <Line options={chartOptions} data={chartData} />
      </section>

      <section className="history-section" style={{ marginTop: '40px' }}>
        <h3>📜 Historia notowań</h3>
        <table className="exchange-table">
          <thead>
            <tr>
              <th>Data</th>
              <th style={{ textAlign: 'right' }}>Cena (PLN)</th>
            </tr>
          </thead>
          <tbody>
            {[...history].reverse().slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{item.data}</td>
                <td className="rate-value" style={{ textAlign: 'right' }}>{item.cena.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CenaZlota;