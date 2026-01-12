import React from 'react';

const Autor = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Informacje o autorze</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h4 className="card-title">Jan Gryczon</h4>
              <p className="card-text text-muted">Student Politechniki Śląskiej</p>
              <hr />
              <ul className="list-unstyled">
                <li><strong>Wydział:</strong> Automatyki, Elektroniki i Informatyki</li>
                <li><strong>Kierunek:</strong> Informatyka</li>
                <li><strong>Przedmiot:</strong> Programowanie Udostępniane</li>
                <li><strong>Rok akademicki:</strong> 2025/2026</li>
              </ul>
              <div className="alert alert-info mt-3">
                Projekt aplikacji wykorzystującej API Narodowego Banku Polskiego do monitorowania kursów walut i cen złota.
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted text-center">
          © 2026 Jan Gryczon - Politechnika Śląska
        </div>
      </div>
    </div>
  );
};

export default Autor;