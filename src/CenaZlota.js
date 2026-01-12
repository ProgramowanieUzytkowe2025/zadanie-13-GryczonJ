import React, { useState, useEffect } from 'react';

const CenaZlota = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pobieramy 10 ostatnich notowań
    const fetchGoldHistory = async () => {
      try {
        const response = await fetch('https://api.nbp.pl/api/cenyzlota/last/10?format=json');
        if (!response.ok) throw new Error('Nie udało się pobrać danych historycznych.');
        
        const data = await response.json();
        setHistory(data.reverse()); // Odwracamy, by najnowsze było na górze
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldHistory();
  }, []);

  if (loading) return <p>Ładowanie danych...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const currentPrice = history[0];

  return (
    <div className="gold-page">
      <h2>Notowania Ceny Złota</h2>

      {/* Aktualna cena w wyróżnionym boksie */}
      <section className="current-price-box">
        <h3>Aktualne notowanie ({currentPrice.data})</h3>
        <p className="price-value">{currentPrice.cena} PLN / g</p>
      </section>

      {/* Tabela z historią (10 ostatnich) */}
      <section className="history-section">
        <h3>Ostatnie 10 notowań</h3>
        <table className="gold-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cena (PLN/g)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.data}</td>
                <td>{item.cena.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CenaZlota;