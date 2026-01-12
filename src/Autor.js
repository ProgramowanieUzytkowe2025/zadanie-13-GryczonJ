import React from 'react';

const Autor = () => {
  return (
    <div className="autor-container">
      <header className="gold-header">
        <h2>👤 Profil Autora</h2>
        <p className="meta-info">Informacje o twórcy aplikacji</p>
      </header>

      <div className="autor-card">
        <div className="details-card" style={{ textAlign: 'center', borderLeft: 'none', borderBottom: '5px solid var(--primary-blue)' }}>
          <h1 style={{ margin: '10px 0 5px 0', color: 'var(--primary-blue)' }}>Jan Gryczon</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', fontWeight: '500' }}>
            Student Politechniki Śląskiej
          </p>
        </div>

        <div className="info-box">
          <h3 className="section-title" style={{ marginTop: 0 }}>🎓 Dane Akademickie</h3>
          <table className="exchange-table" style={{ boxShadow: 'none', marginTop: '10px' }}>
            <tbody>
              <tr>
                <td><strong>Wydział</strong></td>
                <td>Inżynierii Materiałowej</td>
              </tr>
              <tr>
                <td><strong>Kierunek</strong></td>
                <td>Informatyka Przemysłowa i Cyfryzacja Przemysłu</td>
              </tr>
              <tr>
                <td><strong>Przedmiot</strong></td>
                <td>Programowanie Użytkowe</td>
              </tr>
              <tr>
                <td><strong>Rok akademicki</strong></td>
                <td>2025/2026</td>
              </tr>
            </tbody>
          </table>
        </div>

  
        <div className="details-card" style={{ marginTop: '30px' }}>
          <h3 className="section-title" style={{ marginTop: 0 }}>🚀 O Projekcie</h3>
          <p style={{ lineHeight: '1.6' }}>
            Aplikacja została stworzona jako zadanie na laboratorium. Głównym celem jest 
            integracja z systemem <strong>API Narodowego Banku Polskiego (NBP)</strong> w celu 
            dostarczenia użytkownikowi bieżących informacji o:
          </p>
          <ul style={{ paddingLeft: '20px', color: '#444' }}>
            <li>Kursach walut z tabel A, B oraz C.</li>
            <li>Historycznych i bieżących notowaniach cen złota.</li>
            <li>Szczegółowych parametrach poszczególnych walut.</li>
          </ul>
        </div>

        <footer style={{ textAlign: 'center', marginTop: '40px', padding: '20px', borderTop: '1px solid #eee', color: '#888', fontSize: '0.9rem' }}>
          © 2026 Jan Gryczon - Politechnika Śląska | Wszystkie dane pochodzą z api.nbp.pl
        </footer>
      </div>
    </div>
  );
};

export default Autor;