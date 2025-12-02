import { useEffect, useRef, useState } from "react";
import "./styles/header.css";
import { Link } from "react-router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLUListElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setMenuOpen((v) => !v);

  // Mantener clases compatibles con el CSS existente
  const getMenuClasses = () => `bx bx-menu${menuOpen ? " bx-x menu-open" : ""}`;
  const getNavClasses = () => `navlist${menuOpen ? " mobile-open" : ""}`;

  // Añadir/quitar clase en body para bloqueo de scroll y posibles hooks CSS
  useEffect(() => {
    const bodyClass = "menu-open-body";
    if (menuOpen) document.body.classList.add(bodyClass);
    else document.body.classList.remove(bodyClass);
    return () => document.body.classList.remove(bodyClass);
  }, [menuOpen]);

  // Cerrar al hacer click fuera del nav o del icono, y al pulsar Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuOpen) return;
      const target = e.target as Node | null;
      if (
        navRef.current &&
        iconRef.current &&
        target &&
        !navRef.current.contains(target) &&
        !iconRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    }

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header>
      <Link to={""} className="logo">
        <h3>DragonBall</h3>
      </Link>

      <ul ref={navRef} className={getNavClasses()} id="primary-navigation">
        <li>
          <Link to={""} onClick={() => setMenuOpen(false)}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to={"personajes"} onClick={() => setMenuOpen(false)}>
            Personajes
          </Link>
        </li>
        <li>
          <Link to={"planetas"} onClick={() => setMenuOpen(false)}>
            Planetas
          </Link>
        </li>
      </ul>

      <div
        ref={iconRef}
        className={getMenuClasses()}
        id="menu-icon"
        role="button"
        tabIndex={0}
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleMenu();
        }}
      />
    </header>
  );
};

export default Header;