import './styles/footer.css'
import { Link } from 'react-router'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="logo">DragonBall</div>
          <p className="tag">Fan demo · Datos públicos · No oficial</p>
        </div>

        <div className="footer-center">
          <nav className="footer-nav" aria-label="Pie de página">
            <Link to="/">Inicio</Link>
            <Link to="/personajes">Personajes</Link>
            <Link to="/planetas">Planetas</Link>
          </nav>
          <p className="footer-note">Diseñado con React · Datos obtenidos desde API pública.</p>
        </div>

        <div className="footer-right">
          <div className="socials" aria-hidden>
            <a href="#" aria-label="instagram" className="icon" title="Instagram"><i className="ri-instagram-line"></i></a>
            <a href="#" aria-label="youtube" className="icon" title="Youtube"><i className="ri-youtube-line"></i></a>
            <a href="#" aria-label="facebook" className="icon" title="Facebook"><i className="ri-facebook-fill"></i></a>
          </div>
          <div className="copyright">© {year} DragonBall</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
