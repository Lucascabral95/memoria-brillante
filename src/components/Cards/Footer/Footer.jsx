import "./Footer.scss"
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import storeZustand from '../../../zusntand';
import español from "../../../../JSON/español.json"
import ingles from "../../../../JSON/ingles.json"

const Footer = () => {
  const { darkMode, idiomaSeleccionado } = storeZustand();
  
  return (
    <footer className='footer'>
      <div className="contenedor">

        <div className="contenedor-icons">
          <a href="https://github.com/Lucascabral95" target="_blank" >
            <div className="icono">
              <FaGithub style={{ color: !darkMode ? '#232323' : '#FFFFFF' }} className='icon' />
            </div>
          </a>
          <a href="https://www.instagram.com/lucascabral95/" target="_blank">
            <div className="icono">
              <FaInstagram style={{ color: !darkMode ? '#232323' : '#FFFFFF' }} className='icon' />
            </div>
          </a>
          <a href="https://web.facebook.com/lucas.cabral3/" target="_blank">
            <div className="icono">
              <FaFacebook style={{ color: !darkMode ? '#232323' : '#FFFFFF' }} className='icon' />
            </div>
          </a>
          <a href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/" target="_blank">
            <div className="icono">
              <FaLinkedin style={{ color: !darkMode ? '#232323' : '#FFFFFF' }} className='icon' />
            </div>
          </a>
        </div>

        <div className="titulo-footer">
          <h5>
            {idiomaSeleccionado === "español" ? español[0].textoFooter : ingles[0].textoFooter}
            ❤🚀 </h5>
        </div>

      </div>
    </footer>
  )
}

export default Footer