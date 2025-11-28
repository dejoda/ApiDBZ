import { useEffect, useState } from "react";
import "./styles/personajes.css";
import type { ipersonajes } from "../model/ipersonajes";
import { DragonBallService } from "../services/DragonBallServices";
import Scroll from "../components/scroll";
import ScrollReveal from "scrollreveal";
import Buscador from "../components/buscador";
import PaginacionGrande from "../components/paginaciongrande";
import PaginacionCompacta from "../components/paginacioncompacta";

const Personajes = () => {

  const [personajes, setPersonajes] = useState<ipersonajes[]>([]);
  const [page, setPage] = useState(1);
  const [, setTotalPages] = useState(6);
  const [busqueda, setBusqueda] = useState("");

  const service = new DragonBallService();

  const getTodosPersonajes = async () => {
    try {
      const pages = 6;
      let todos: ipersonajes[] = [];

      for (let i = 1; i <= pages; i++) {
        const data = await service.getPersonajesTodos(i);
        todos = [...todos, ...data];
      }

      setPersonajes(todos);
      setTotalPages(pages);
    } catch (err) {
      console.error("Error cargando personajes:", err);
    }
  };

  const escenarios = [
    "https://e0.pxfuel.com/wallpapers/519/713/desktop-wallpaper-dragon-ball-z-kakarot-ps4-dragon-ball-scenery.jpg",
    "https://e0.pxfuel.com/wallpapers/373/930/desktop-wallpaper-anime-dragon-ball-z-dragon-ball-z-dragon-ball-scenery-background.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/621/647/desktop-wallpaper-dbz-scenery-background-dragon-ball.jpg",
    "https://cdn.alfabetajuega.com/alfabetajuega/2024/12/este-es-el-lugar-donde-empezo-todo-el-tema-de-las-artes-marciales-en-la-obra.jpg"
  ];

  useEffect(() => {
    getTodosPersonajes();
  }, []);

  useEffect(() => {
    const sr = ScrollReveal({
      distance: "65px",
      duration: 900,
      delay: 200,
      reset: false,
    });

    sr.reveal(".Introduccion", { origin: "top", delay: 150 });
    sr.reveal(".controls-inner", { origin: "top", delay: 300 });
    sr.reveal(".cards-grid .card-modern", {
      origin: "bottom",
      distance: "45px",
      interval: 100,
    });
  }, []);

  const personajesFiltrados = personajes.filter((per) =>
    per.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const personajesMostrados = personajesFiltrados.slice(startIndex, startIndex + itemsPerPage);

  const totalPagesFiltrados = Math.ceil(personajesFiltrados.length / itemsPerPage);

  return (
    <main className="personajes-page">
      

      <div className="personajes-inner">

        {/* SE USA EL BUSCADOR IMPORTADO */}
        <div className="controls-inner">
          <Buscador busqueda={busqueda} setBusqueda={setBusqueda} setPage={setPage}/>
          {/* Paginación compacta */}
         <PaginacionCompacta page={page} totalPages={totalPagesFiltrados} setPage={setPage}/>
        </div>
        {/* Cards */}
        <div className="cards-grid">
          {personajesMostrados.map((per, idx) => {
            const idIndex = typeof per.id === "number" ? per.id : idx;
            const scene = escenarios[idIndex % escenarios.length];
            return (
              <article key={per.id} className="card-modern">
                <div className="card-modern-img" style={{ backgroundImage: `url('${scene}')` }}>
                  <img src={per.image} alt={per.name} />
                </div>

                <div className="card-modern-body">
                  <h3 className="card-title">{per.name}</h3>

                  <div className="card-tags">
                    <span>{per.race || "Desconocido"}</span>
                    <span>{per.gender || "—"}</span>
                  </div>

                  <div className="card-info">
                    <p><strong>Ki:</strong> {per.ki}{per.maxki}</p>
                    <p><strong>Afiliación:</strong> {per.affiliation || "—"}</p>
                  </div>

                  <button className="btn-modern">Ver más</button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Paginación grande */}
        <PaginacionGrande page={page}totalPages={totalPagesFiltrados}setPage={setPage}/>
        {/* Paginación grande */}
      </div>
      <Scroll />
    </main>
  );
};

export default Personajes;
