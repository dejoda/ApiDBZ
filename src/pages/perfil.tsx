import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DragonBallService } from "../services/DragonBallServices";
import type { iguerreros } from "../model/iguerreros";
import "./styles/perfil.css";
import Scroll from "../components/scroll";

const service = new DragonBallService();

export default function Perfil() {
  const { id } = useParams(); // ← recibimos el id de la URL
  const [personaje, setPersonaje] = useState<iguerreros | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"descripcion" | "planeta" | "transformaciones">("descripcion");

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      const data = await service.getPersonajeFull(Number(id));
      setPersonaje(data);
    };
    getData();
    setCarouselIndex(0);
  }, [id]);

  if (!personaje) return <h2>Cargando personaje...</h2>;

  // Robust parsing for Ki values that may contain thousands separators or suffixes
  const parseSmartNumber = (raw?: string | number | null): number => {
    if (raw == null) return NaN;
    if (typeof raw === 'number') return raw;
    const s = String(raw).trim();
    if (!s) return NaN;
    // try direct conversion first
    const direct = Number(s.replace(/\s+/g, ''));
    if (!Number.isNaN(direct)) return direct;

    // handle suffixes like Million, Billion, Septillion, etc.
    const suffixMap: Record<string, number> = {
      thousand: 1e3,
      million: 1e6,
      billion: 1e9,
      trillion: 1e12,
      quadrillion: 1e15,
      quintillion: 1e18,
      sextillion: 1e21,
      septillion: 1e24,
    };

    // extract numeric fragment
    const numMatch = s.match(/[\d.,]+/);
    const numPart = numMatch ? numMatch[0] : '';
    let cleaned = numPart;
    if (!cleaned) return NaN;

    // If both dot and comma exist, assume dot thousands and comma decimal (e.g. 1.234,56)
    if (cleaned.indexOf('.') > -1 && cleaned.indexOf(',') > -1) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else if (cleaned.indexOf('.') > -1 && /\.(?=\d{3})/.test(cleaned)) {
      // dots used as thousand separators like 54.000.000
      cleaned = cleaned.replace(/\./g, '');
    } else {
      // remove commas as thousands separators
      cleaned = cleaned.replace(/,/g, '');
    }

    const base = Number(cleaned);
    if (!Number.isNaN(base)) {
      // detect suffix
      const suffix = s.replace(numPart, '').toLowerCase();
      for (const key in suffixMap) {
        if (suffix.includes(key)) return base * suffixMap[key];
      }
      return base;
    }
    return NaN;
  };

  const kiValRaw = parseSmartNumber(personaje.ki);
  const maxKiRaw = parseSmartNumber(personaje.maxKi as any);
  const kiVal = Number.isFinite(kiValRaw) ? kiValRaw : 0;
  const maxKiVal = Number.isFinite(maxKiRaw) && maxKiRaw > 0 ? maxKiRaw : (kiVal > 0 ? kiVal : 100);
  const kiPercent = Math.round((kiVal / maxKiVal) * 100);

  return (
    <main className="perfil-page">
      <div className="perfil-container">
        <div className="perfil-header">
          <h1 className="perfil-name">{personaje.name}</h1>
          <div className="perfil-chips">
            <span className="chip">{personaje.race || "Desconocido"}</span>
            <span className="chip">{personaje.gender || "—"}</span>
            <span className="chip">{personaje.affiliation || "—"}</span>
          </div>
        </div>

        <nav className="perfil-tabs" role="tablist" aria-label="Secciones del perfil">
          <button
            className={`tab-btn ${activeTab === "descripcion" ? "active" : ""}`}
            onClick={() => setActiveTab("descripcion")}
            role="tab"
            aria-selected={activeTab === "descripcion"}
          >
            Descripción
          </button>
          <button
            className={`tab-btn ${activeTab === "planeta" ? "active" : ""}`}
            onClick={() => setActiveTab("planeta")}
            role="tab"
            aria-selected={activeTab === "planeta"}
          >
            Planeta
          </button>
          <button
            className={`tab-btn ${activeTab === "transformaciones" ? "active" : ""}`}
            onClick={() => setActiveTab("transformaciones")}
            role="tab"
            aria-selected={activeTab === "transformaciones"}
          >
            Transformaciones
          </button>
        </nav>

        <div className="perfil-grid">
          <aside className="perfil-left">
            <div className="avatar-wrap">
              <img src={personaje.image} alt={personaje.name} className="avatar" />
            </div>

            <div className="stats-card">
              <h3>Estadísticas</h3>
              <div className="stat-row">
                <div className="stat-label">Ki</div>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: `${kiPercent}%` }} />
                </div>
                <div className="stat-value">{personaje.ki} / {personaje.maxKi || "—"}</div>
              </div>
            </div>
          </aside>

          <section className="perfil-right">
            {activeTab === "descripcion" && (
              <div className="glass-card tab-panel">
                <h2>Descripción</h2>
                <p>{personaje.description}</p>
              </div>
            )}

            {activeTab === "planeta" && (
              <div className="glass-card tab-panel planet-card">
                <h2>Planeta de origen</h2>
                <div className="planet-inner">
                  <img src={personaje.originPlanet.image} alt={personaje.originPlanet.name} />
                  <div className="planet-info">
                    <h3>{personaje.originPlanet.name}</h3>
                    <p><strong>Destruido:</strong> {personaje.originPlanet.isDestroyed ? "Sí" : "No"}</p>
                    <p>{personaje.originPlanet.description}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transformaciones" && (
              <div className="glass-card tab-panel">
                <h2>Transformaciones</h2>
                {personaje.transformations && personaje.transformations.length > 0 ? (
                  <div className="carousel">
                    <button
                      className="carousel-btn left"
                      onClick={() => setCarouselIndex((i) => (i - 1 + personaje.transformations.length) % personaje.transformations.length)}
                      aria-label="Anterior"
                      title="Anterior"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className="carousel-viewport">
                      <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                      >
                        {personaje.transformations.map((t) => (
                          <div className="carousel-item" key={t.id}>
                            <div className="transform-card modern">
                              <img
                                src={t.image}
                                alt={t.name}
                                className="transform-img-full"
                                
                              />
                              <div className="transform-caption">
                                <h4>{t.name}</h4>
                                <p><strong>Ki:</strong> {t.ki}</p>
                              </div>
                              <div className="transform-body">
                                <h4>{t.name}</h4>
                                <p><strong>Ki:</strong> {t.ki}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      className="carousel-btn right"
                      onClick={() => setCarouselIndex((i) => (i + 1) % personaje.transformations.length)}
                      aria-label="Siguiente"
                      title="Siguiente"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className="carousel-dots">
                      {personaje.transformations.map((_, idx) => (
                        <button
                          key={idx}
                          className={`dot ${idx === carouselIndex ? "active" : ""}`}
                          onClick={() => setCarouselIndex(idx)}
                          aria-label={`Ir a transformación ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-transforms">
                    <p>No hay transformaciones disponibles.</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
      <Scroll />
      {/* Modal / Lightbox for full image */}
      {/* modal removed per design request */}
    </main>
  );
}
