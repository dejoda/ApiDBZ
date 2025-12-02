import React from "react";
import './styles/buscador.css'
interface BuscadorProps {
  busqueda: string;
  setBusqueda: (value: string) => void;
  setPage: (value: number) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ busqueda, setBusqueda, setPage }) => {
  return (
    <div className="search-left">
      <label htmlFor="search-input" className="sr-only">Buscar</label>

      <div className="search-box modern" role="search">
        <span className="search-icon" aria-hidden>🔎</span>

        <input
          id="search-input"
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPage(1);
          }}
          aria-label="Buscar"
        />

        {busqueda && (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setBusqueda("");
              setPage(1);
            }}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Buscador;
