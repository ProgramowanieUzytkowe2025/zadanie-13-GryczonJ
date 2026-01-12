import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SzczegolyWaluty = () => {
  const { waluta } = useParams(); // Pobiera :waluta z adresu URL
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      setLoading(true);
      try {
        // Korzystamy z endpointu dla pojedynczej waluty (Tabela A)
        const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${waluta}/?format=json`);
        
        if (!response.ok) {
          throw new Error('Nie znaleziono szczegółów dla tej waluty.');
        }

        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyDetails();
  }, [waluta]);

  if (loading) return <div>Ładowanie szczegółów...</div>;
  if (error) return (
    <div className="error">
      <p>{error}</p>
      <button onClick={() => navigate('/tabela-kursowa')}>Wróć do tabeli</button>
    </div>
  );

  return (
    <div className="currency-details">
      <button onClick={() => navigate(-1)} className="back-button">← Powrót</button>
      
      <h2>Szczegóły waluty: {details.code}</h2>
      
      <div className="details-card">
        <p><strong>Pełna nazwa:</strong> {details.currency}</p>
        <p><strong>Kod waluty:</strong> {details.code}</p>
        <p className="big-rate">
          <strong>Aktualny kurs średni:</strong> {details.rates[0].mid.toFixed(4)} PLN
        </p>
        <p className="meta-info">Data notowania: {details.rates[0].effectiveDate}</p>
      </div>
    </div>
  );
};

export default SzczegolyWaluty;