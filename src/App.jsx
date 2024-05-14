import Cards from './components/Cards/Cards.jsx'
import "./App.scss";
import storeZustand from './zusntand.jsx';
import Footer from './components/Cards/Footer/Footer.jsx';
import { useEffect, useState } from 'react';
import español from "../JSON/español.json"
import ingles from "../JSON/ingles.json"


function App() {
  const { darkMode, idiomaSeleccionado } = storeZustand();
  const [subtitulo, setSubtitulo] = useState("");

  useEffect(() => {
    if (idiomaSeleccionado === "español") {
      setSubtitulo(español[0].titulo)
    } else {
      setSubtitulo(ingles[0].titulo)
    }
  }, [idiomaSeleccionado])

  return (
    <body style={{ backgroundColor: darkMode ? 'var(--darkMode-bg)' : 'white', color: darkMode ? 'var(--darkMode-text-color)' : 'black' }}>

        <div className="parte-superior">
          <div className="titulo">
            <h1 style={{ color: darkMode ? '#2ecc71' : '#34495e' }}>
              {subtitulo}
            </h1>
          </div>
          <Cards />
        </div>

        <div className="parte-inferior">
          <Footer />
        </div>

    </body>
  )
}

export default App
