import { useEffect, useRef, useState } from "react";
import "./styles/inicio.css";
import { DragonBallService } from "../services/DragonBallServices";
import type { ipersonajes } from "../model/ipersonajes";
import Icons from "../components/icons";
import { useNavigate } from "react-router";
import { initScroll } from "../utils/scrollSetup";
import Scroll from "../components/scroll";

const Inicio = () => {
  const [personajes, setPersonajes] = useState<ipersonajes[]>([]);
  const [loading, setLoading] = useState(true);

  const service = new DragonBallService();
  const revealedRef = useRef(false);
  const navigate = useNavigate();

  /* --------------------------
   * Cargar personajes
   * -------------------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 58) + 1;
        const data = await service.getPersonajes(randomPage);
        setPersonajes(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* --------------------------
   * ScrollReveal (una vez)
   * -------------------------- */
  useEffect(() => {
    if (!loading && personajes.length > 0 && !revealedRef.current) {
      initScroll();
      revealedRef.current = true;
    }
  }, [loading, personajes.length]);

  /* --------------------------
   * Render
   * -------------------------- */

  // Plantilla base mientras carga (sin skeleton)
  if (loading) {
    return (
      <section className="hero fade-init">
        <div className="hero-text">
          <h5>Cargando personaje...</h5>
          <h4>Afiliación</h4>
          <h1>Nombre</h1>
          <p>Descripción del personaje...</p>
          <button className="ver-mas-btn disabled">Ver Más</button>
        </div>

        <div className="hero-img">
          <div className="img-frame placeholder-img" />
        </div>
      </section>
    );
  }

  return (
    <>
      {personajes.map((per) => (
        <section className="hero fade-in" key={per.id}>
          <div className="hero-text">
            <h5>#{per.id} Personaje</h5>
            <h4>{per.affiliation}</h4>
            <h1>{per.name}</h1>
            <p>{per.description}</p>

            <button
              className="ver-mas-btn"
              onClick={() => navigate(`/personajes/perfil/${per.id}`)}
            >
              Ver Más
            </button>
          </div>

          <div className="hero-img">
            <div className="img-frame">
              <img src={per.image} alt={per.name} />
            </div>
          </div>
        </section>
      ))}

      <Icons />
      <Scroll/>
    </>
  );
};

export default Inicio;
