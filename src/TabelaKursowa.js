import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TabelaKursowa = () => {
  const [selectedTable, setSelectedTable] = useState('A');
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.nbp.pl/api/exchangerates/tables/${selectedTable}/?format=json`
        );
        
        if (!response.ok) {
          throw new Error(`Nie udało się pobrać tabeli ${selectedTable}.`);
        }

        const data = await response.json();
        setTableData(data[0]); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [selectedTable]); 

  return (
    <div className="rates-container">
      <h2>Tabela Kursów Walut</h2>

      <div className="table-selector">
        <label htmlFor="table-select">Wybierz typ tabeli: </label>
        <select 
          id="table-select" 
          value={selectedTable} 
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="A">Tabela A (kursy średnie)</option>
          <option value="B">Tabela B (kursy średnie - waluty egzotyczne)</option>
          <option value="C">Tabela C (kursy kupna i sprzedaży)</option>
        </select>
      </div>

      {loading && <div className="loader">Ładowanie danych...</div>}
      {error && <div className="error" style={{color: 'red'}}>Błąd: {error}</div>}

      {!loading && !error && tableData && (
        <>
          <p className="meta-info">
            Numer: <strong>{tableData.no}</strong> | 
            Data: <strong>{tableData.effectiveDate}</strong>
          </p>

          <table className="exchange-table">
            <thead>
              <tr>
                <th>Nazwa waluty</th>
                <th>Kod</th>
                {selectedTable === 'C' ? (
                  <>
                    <th>Kupno (Bid)</th>
                    <th>Sprzedaż (Ask)</th>
                  </>
                ) : (
                  <th>Kurs średni (Mid)</th>
                )}
              </tr>
            </thead>
            <tbody>
              {tableData.rates.map((rate) => (
                <tr key={rate.code}>
                  <td>{rate.currency}</td>
                  <td>
                    <Link to={`/tabela-kursowa/${rate.code}`} className="details-link">
                      {rate.code}
                    </Link>
                  </td>
                  {selectedTable === 'C' ? (
                    <>
                      <td className="rate-value">
                        {rate.bid?.toFixed(4) || "---"}
                      </td>
                      <td className="rate-value">
                        {rate.ask?.toFixed(4) || "---"}
                      </td>
                    </>
                  ) : (
                    <td className="rate-value">
                      {rate.mid?.toFixed(4) || "---"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TabelaKursowa;