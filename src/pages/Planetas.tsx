import { useEffect, useState, useCallback } from "react";
import "./styles/planetas.css";
import type { iplaneta } from "../model/iplaneta";
import { DragonBallService } from "../services/DragonBallServices";
import Buscador from "../components/buscador";
import Scroll from "../components/scroll";

const Planetas = () => {
  const [planetas, setPlanetas] = useState<iplaneta[]>([]);
  const service = new DragonBallService();
  const [busqueda, setBusqueda] = useState("");
  const [, setPage] = useState<number>(1);

  // Modal local para descripción completa
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<iplaneta | null>(null);

  const openModal = useCallback((p: iplaneta) => {
    setSelected(p);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelected(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  const getPlanetas = () => {
    service
      .getPlanetas()
      .then((data) => setPlanetas(data))
      .catch((err) => console.error("ERROR :", err));
  };

  useEffect(() => {
    getPlanetas();
  }, []);

  return (
    <main className="planeta-page">
      <div className="controls-inner">
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} setPage={setPage} />
      </div>

      <div className="planetas list">
        {planetas
          .filter((p) => {
            const q = busqueda.trim().toLowerCase();
            if (!q) return true;
            const name = (p.name || "").toLowerCase();
            const desc = (p.description || "").toLowerCase();
            return name.includes(q) || desc.includes(q);
          })
          .map((p) => (
            <article key={p.id} className="contenedor banner">
              <div
                className="imagen"
                style={{ backgroundImage: `url(${p.image})` }}
                role="img"
                aria-label={p.name}
              />

              <div className="Informacion panel">
                <div className="panel-inner">
                  <h2 className="title">{p.name}</h2>
                  <p className="desc">{p.description}</p>

                  <div className="meta">
                    <span className={`badge ${p.isDestroyed ? "dead" : "alive"}`}>
                      {p.isDestroyed ? "Destruido" : "Habitable"}
                    </span>

                    <button
                      className="btn-cta"
                      aria-label={`Ver más ${p.name}`}
                      onClick={() => openModal(p)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </div>

      <Scroll />

      {/* Modal: descripción completa */}
      {modalOpen && selected && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Cerrar" onClick={closeModal}>
              ×
            </button>
            <div className="modal-body">
              <div className="modal-img">
                <img src={selected.image} alt={selected.name} />
              </div>
              <div className="modal-content">
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
                <div className="modal-status">
                  <span className="status-label">Estado:</span>
                  <span
                    className={`status-pill ${selected.isDestroyed ? "destroyed" : "habitable"}`}
                    aria-live="polite"
                  >
                    {selected.isDestroyed ? "Destruido" : "Habitable"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Planetas;
