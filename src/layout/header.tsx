import { useState } from "react";
import "./styles/header.css";
import { Link } from "react-router";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para las clases del menú
  const getMenuClasses = () => {
    return `bx bx-menu${menuOpen ? " bx-x" : ""}`;
  };
  const getNavClasses = () => `navlist${menuOpen ? " open" : ""}`;
  //
  return (
    <header>
      <a href="#" className="logo">
        <h3>DragonBall</h3>
      </a>
      <ul className={getNavClasses()}>
        <li>
          <Link to={''}>Inicio</Link>
        </li>
        <li>
          <Link to={'personajes'}>Personajes</Link>
        </li>
        <li>
          <Link to={'planetas'}>Planetas</Link>
        </li>
      </ul>

      <div
        className={getMenuClasses()}
        id="menu-icon"
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

export default Header;
