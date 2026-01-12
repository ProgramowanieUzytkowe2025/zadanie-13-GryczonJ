import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SzczegolyWaluty = () => {
  const { waluta } = useParams();
  const navigate = useNavigate();

  // Stany dla danych podstawowych
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stany dla formularza kalkulatora
  const [amount, setAmount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [calculatedResult, setCalculatedResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);

  // Pobranie danych podstawowych (kurs aktualny)
  useEffect(() => {
    const fetchCurrentRate = async () => {
      try {
        const response = await fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${waluta}/?format=json`);
        if (!response.ok) throw new Error('Nie znaleziono waluty.');
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentRate();
  }, [waluta]);

  // Funkcja przeliczająca
  const handleCalculate = async (e) => {
  e.preventDefault();
  setCalcLoading(true);
  setCalculatedResult(null);

  let tempDate = new Date(selectedDate);
  let success = false;
  let attempts = 0;
  const maxAttempts = 7; // Szukamy maksymalnie do tygodnia wstecz

  while (!success && attempts < maxAttempts) {
    const dateString = tempDate.toISOString().split('T')[0];
    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${waluta}/${dateString}/?format=json`
      );

      if (response.ok) {
        const data = await response.json();
        const rate = data.rates[0].mid;
        const result = (amount * rate).toFixed(2);

        setCalculatedResult({
          value: result,
          rate: rate,
          date: data.rates[0].effectiveDate, // To będzie faktyczna data kursu (np. piątek)
          originalDate: selectedDate        // To data wybrana przez użytkownika
        });
        success = true;
      } else {
        // Jeśli błąd 404, cofamy się o 1 dzień
        tempDate.setDate(tempDate.getDate() - 1);
        attempts++;
      }
    } catch (err) {
      alert("Błąd połączenia z API");
      break;
    }
  }

  if (!success) {
    alert("Nie znaleziono kursu w ciągu ostatnich 7 dni od wybranej daty.");
  }
  setCalcLoading(false);
};

  if (loading) return <div className="loader">Ładowanie...</div>;
  if (error) return <div className="error">{error} <button onClick={() => navigate(-1)}>Wróć</button></div>;

  return (
    <div className="currency-details">
      <button onClick={() => navigate(-1)} className="back-button">← Powrót do tabeli</button>
      
      <header className="details-header">
        <h1>{details.currency} ({details.code})</h1>
        <p className="big-rate">Aktualny kurs średni: <strong>{details.rates[0].mid.toFixed(4)} PLN</strong></p>
      </header>

      <hr />

      {/* FORMULARZ PRZELICZANIA */}
      <section className="calculator-section">
        <h3>🧮 Kalkulator walutowy</h3>
        <form onSubmit={handleCalculate} className="calc-form">
          <div className="form-group">
            <label>Kwota w {details.code}:</label>
            <input 
              type="number" 
              step="0.01" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Data kursu:</label>
            <input 
              type="date" 
              value={selectedDate} 
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="calc-button" disabled={calcLoading}>
            {calcLoading ? 'Liczenie...' : 'Przelicz na PLN'}
          </button>
        </form>

        {calculatedResult && (
          <div className="result-box">
            <h4>Wynik przeliczenia:</h4>
            <p className="result-text">
              {amount} {details.code} = <strong>{calculatedResult.value} PLN</strong>
            </p>
            <small>Użyto kursu z dnia {calculatedResult.date}: 1 {details.code} = {calculatedResult.rate} PLN</small>
          </div>
        )}
      </section>
    </div>
  );
};

export default SzczegolyWaluty;