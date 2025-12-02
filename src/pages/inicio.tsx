import { useEffect, useState } from "react";
import "./styles/inicio.css";
import { DragonBallService } from "../services/DragonBallServices";
import type { ipersonajes } from "../model/ipersonajes";
import Icons from "../components/icons";
import ScrollReveal from "scrollreveal";
import { useNavigate } from "react-router";

const Inicio = () => {
  /* -----------------------------------------------------
   * Estados
   * ----------------------------------------------------- */
  const [personajes, setPersonajes] = useState<ipersonajes[]>([]);
  const [page, setPage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  /* -----------------------------------------------------
   * Servicio
   * ----------------------------------------------------- */
  const service = new DragonBallService();

  /* -----------------------------------------------------
   * Métodos
   * ----------------------------------------------------- */
  const getPersonajes = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await service.getPersonajes(pageNumber);
      setPersonajes(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------------------------
   * useEffect – Página aleatoria al iniciar
   * ----------------------------------------------------- */
  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 58) + 1;
    setPage(randomPage);
  }, []);

  /* -----------------------------------------------------
   * useEffect – Obtener personajes cuando cambie la página
   * ----------------------------------------------------- */
  useEffect(() => {
    if (page !== null) {
      getPersonajes(page);
    }
  }, [page]);

  /* -----------------------------------------------------
   * useEffect – ScrollReveal (solo cuando cargó)
   * ----------------------------------------------------- */
  useEffect(() => {
    if (loading || personajes.length === 0) return;

    const sr = ScrollReveal({
      distance: "65px",
      duration: 1000,
      delay: 450,
      reset: false,
    });

    const id = setTimeout(() => {
      try {
        sr.reveal(".hero-text", { delay: 200, origin: "top" });
        sr.reveal(".hero-img", { delay: 450, origin: "top" });
      } catch (e) {}
    }, 80);

    return () => {
      clearTimeout(id);
      if (sr.destroy) sr.destroy();
    };
  }, [loading, personajes]);

  /* -----------------------------------------------------
   * Render
   * ----------------------------------------------------- */
  const navigate = useNavigate();

  // Loader temporal para evitar pantalla blanca
  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Cargando personaje...</p>
      </div>
    );
  }

  return (
    <>
      {personajes.map((per) => (
        <section className="hero" key={per.id}>
          <div className="hero-text">
            <h5>#{per.id} Personaje</h5>
            <h4>{per.affiliation}</h4>
            <h1>{per.name}</h1>
            <p>{per.description}</p>

            <button
              className="ver-mas-btn"
              onClick={() => navigate(`/personajes/perfil/${per.id}`)}
              aria-label={`Ver más ${per.name}`}
            >
              Ver Mas
            </button>

            <a href="#" className="ctaa">
              <i className="ri-play-fill"></i>Watch Gameplay
            </a>
          </div>

          <div className="hero-img">
            <div className="img-frame">
              <img src={per.image} alt={per.name} />
            </div>
          </div>
        </section>
      ))}

      <Icons />
    </>
  );
};

export default Inicio;
