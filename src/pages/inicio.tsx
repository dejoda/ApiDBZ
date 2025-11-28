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
  const [page, setPage] = useState(1);

  /* -----------------------------------------------------
   * Servicio
   * ----------------------------------------------------- */
  const service = new DragonBallService();

  /* -----------------------------------------------------
   * Métodos
   * ----------------------------------------------------- */
  const getPersonajes = (pageNumber: number) => {
    service
      .getPersonajes(pageNumber)
      .then((data) => setPersonajes(data))
      .catch((err) => console.error("Error:", err));
  };

  /* -----------------------------------------------------
   * useEffect – Obtener personajes cuando cambie la página
   * ----------------------------------------------------- */
  useEffect(() => {
    getPersonajes(page);
  }, [page]);

  /* -----------------------------------------------------
   * useEffect – Página aleatoria al iniciar
   * ----------------------------------------------------- */
  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 58) +1;
    setPage(randomPage);
  }, []);

  /* -----------------------------------------------------
   * useEffect – ScrollReveal
   * ----------------------------------------------------- */
 useEffect(() => {
  // Run ScrollReveal only after personajes have been rendered
  if (!personajes || personajes.length === 0) return;

  const sr = ScrollReveal({
    distance: "65px",
    duration: 1000,
    delay: 450,
    reset: false,
  });

  // small delay to ensure DOM paint
  const id = window.setTimeout(() => {
    try {
      sr.reveal(".hero-text", { delay: 200, origin: "top" });
      sr.reveal(".hero-img", { delay: 450, origin: "top" });
    } catch (e) {
      // ignore if reveal fails
      // console.warn('ScrollReveal failed', e);
    }
  }, 60);

  return () => {
    window.clearTimeout(id);
    if (sr && typeof sr.destroy === "function") sr.destroy();
  };
}, [personajes]);


  /* -----------------------------------------------------
   * Render
   * ----------------------------------------------------- */
  const navigate = useNavigate();

  return (
    <>
      {personajes.map((per) => (
        <section className="hero" key={per.id}>
          <div className="hero-text">
            <h5>#{per.id} Personaje</h5>
            <h4>{per.affiliation}</h4>
            <h1>{per.name}</h1>
            <p>{per.description}</p>

            <button className="ver-mas-btn" onClick={() => navigate(`/personajes/perfil/${per.id}`)} aria-label={`Ver más ${per.name}`}>
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
