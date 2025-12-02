import { useEffect, useState } from "react";
import "./styles/planetas.css";
import type { iplaneta } from "../model/iplaneta";
import { DragonBallService } from "../services/DragonBallServices";

const Planetas = () => {
  const [planetas, setPlanetas] = useState<iplaneta[]>([]);
  const service = new DragonBallService();

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
      <div className="planetas list">
        {planetas.map((p) => (
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
                  <button className="btn-cta" aria-label={`Ver más ${p.name}`}>Ver más</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Planetas;
