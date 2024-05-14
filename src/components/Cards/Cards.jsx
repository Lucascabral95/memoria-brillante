import React, { useState, useEffect } from 'react';
import "./Cards.scss";
import ReactCardFlip from 'react-card-flip';
import storeZustand from '../../zusntand.jsx';
import images from "../../../JSON/imagenes.json";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import dificultades from "../../../JSON/dificultades.json"
import { FaMoon } from "react-icons/fa";
import { AiFillSun } from "react-icons/ai";
import español from "../../../JSON/español.json"
import ingles from "../../../JSON/ingles.json"

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [matchedIndexes, setMatchedIndexes] = useState([]);
    const [allowFlip, setAllowFlip] = useState(true);
    const [intentosFallidos, setIntentosFallidos] = useState(0);
    const { darkMode, toggleDarkMode, idiomaSeleccionado, cambiarIdioma } = storeZustand();
    const [dificultad, setDificultad] = useState("");
    const [reglasDeDificultad, setReglasDeDificultad] = useState({
        muyFacil: 4,
        facil: 6,
        intermedia: 8,
        dificil: 10,
        muyDificil: 14
    });
    const [reinicioDificultad, setReinicioDificultad] = useState(false);
    const [dificultadActual, setDificultadActual] = useState("");
    const [subtitulos, setSubtitulos] = useState([]);

    useEffect(() => {
        if (idiomaSeleccionado === "español") {
            setSubtitulos({
                intentos: español[0].intentos,
                dificultadPregunta: español[0].dificultadPregunta,
                botonLimpiar: español[0].bontonLimpiar,
                dificultadPalabra: español[0].dificultadPalabra,
                felicitacionTitulo: español[0].felicitacionTitulo,
                felicitacionesTexto: español[0].felicitacionesTexto,
                botonDecision: español[0].botonDecision,
                botonDecisionDos: español[0].botonDecisionDos,
                eleccionDeDificultad: español[0].eleccionDeDificultad,
                muyFacil: español[0].muyFacil,
                facil: español[0].facil,
                intermedia: español[0].intermedia,
                dificil: español[0].dificil,
                muyDificil: español[0].muyDificil,
            })
        } else {
            setSubtitulos({
                intentos: ingles[0].intentos,
                dificultadPregunta: ingles[0].dificultadPregunta,
                botonLimpiar: ingles[0].bontonLimpiar,
                dificultadPalabra: ingles[0].dificultadPalabra,
                felicitacionTitulo: ingles[0].felicitacionTitulo,
                felicitacionesTexto: ingles[0].felicitacionesTexto,
                botonDecision: ingles[0].botonDecision,
                botonDecisionDos: ingles[0].botonDecisionDos,
                eleccionDeDificultad: ingles[0].eleccionDeDificultad,
                muyFacil: ingles[0].muyFacil,
                facil: ingles[0].facil,
                intermedia: ingles[0].intermedia,
                dificil: ingles[0].dificil,
                muyDificil: ingles[0].muyDificil
            })
        }
    }, [idiomaSeleccionado]);

    useEffect(() => {
        const generateIndices = (difficulty) => {
            switch (difficulty) {
                case 'muyFacil':
                    return generateRandomIndices(reglasDeDificultad.muyFacil);
                case 'fácil':
                    return generateRandomIndices(reglasDeDificultad.facil);
                case 'intermedia':
                    return generateRandomIndices(reglasDeDificultad.intermedia);
                case 'difícil':
                    return generateRandomIndices(reglasDeDificultad.dificil);
                case 'muyDificil':
                    return generateRandomIndices(reglasDeDificultad.muyDificil);
                default:
                    return [];
            }
        };

        const generateRandomIndices = (count) => {
            const indices = [];
            while (indices.length < count) {
                const index = Math.floor(Math.random() * images.length);
                if (!indices.includes(index)) {
                    indices.push(index);
                }
            }
            return indices;
        };

        if (dificultad !== "") {
            const indices = generateIndices(dificultad);
            const selectedCards = indices.map((index) => images[index]);
            const duplicatedCards = selectedCards.concat(selectedCards).sort(() => Math.random() - 0.5);
            setCards(duplicatedCards);
        }
    }, [dificultad, reinicioDificultad]);

    useEffect(() => {
        if (flippedIndexes.length === 2) {
            const [firstIndex, secondIndex] = flippedIndexes;
            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedIndexes([...matchedIndexes, firstIndex, secondIndex]);
                setFlippedIndexes([]);
            } else {
                setAllowFlip(false);
                setTimeout(() => {
                    setFlippedIndexes([]);
                    setAllowFlip(true);
                }, 1000);
                setIntentosFallidos(intentosFallidos + 1);
            }
        }

        if (matchedIndexes.length > 2 && matchedIndexes.length === cards.length) {
            Swal.fire({
                icon: 'success',
                title: `${subtitulos.felicitacionTitulo}`,
                text: `${subtitulos.felicitacionesTexto}`,
                showCancelButton: true,
                confirmButtonText: `${subtitulos.botonDecision}`,
                cancelButtonText: `${subtitulos.botonDecisionDos}`,
            }).then((result) => {
                if (result.isConfirmed) {
                    setIntentosFallidos(0);
                    setFlippedIndexes([]);
                    setAllowFlip(true);
                    setMatchedIndexes([]);
                    setDificultad(dificultad);
                    setReinicioDificultad(!reinicioDificultad);
                } else {
                    limpiarJuego();
                }
            });

        }
    }, [flippedIndexes, cards, matchedIndexes]);

    const handleCardClick = (index) => {
        if (flippedIndexes.includes(index) || matchedIndexes.includes(index) || !allowFlip) return;
        setFlippedIndexes([...flippedIndexes, index]);
    };

    const limpiarJuego = () => {
        setCards([]);
        setFlippedIndexes([]);
        setMatchedIndexes([]);
        setAllowFlip(true);
        setIntentosFallidos(0);
        setDificultad("");
    }

    const seleccionDificultad = (dificultad) => {
        setDificultad(dificultad);
        if (dificultad === "muyFacil") {
            setDificultadActual(subtitulos.muyFacil);
        } else if (dificultad === "fácil") {
            setDificultadActual(subtitulos.facil);
        } else if (dificultad === "intermedia") {
            setDificultadActual(subtitulos.intermedia);
        } else if (dificultad === "difícil") {
            setDificultadActual(subtitulos.dificil);
        } else if (dificultad === "muyDificil") {
            setDificultadActual(subtitulos.muyDificil);
        }
    }
    const dificultadElegida = (dificultad) => {
        let dif = "";
        switch (dificultad) {
            case "Muy fácil":
                dif = subtitulos.muyFacil;
                break;
            case "Fácil":
                dif = subtitulos.facil;
                break;
            case "Intermedia":
                dif = subtitulos.intermedia;
                break;
            case "Difícil":
                dif = subtitulos.dificil;
                break;
            case "Muy difícil":
                dif = subtitulos.muyDificil;
                break;
            default:
                break;
        }
    
        toast.success(`${subtitulos.dificultadPalabra} ${dif}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <main>
            <div className="contenedor-del-main">
                {cards.length > 0 &&
                    <div className="intentos">
                        <h2 className='text-center'>
                            {subtitulos.intentos}: {intentosFallidos}
                        </h2>
                    </div>
                }

                <div className="botones">
                    <button className="btn"
                        style={{
                            backgroundColor: !darkMode ? "#232323" : "#FEC7EE",
                            color: !darkMode ? "#FEC7EE" : "#232323",
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={toggleDarkMode}>
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                        {darkMode ? <AiFillSun style={{ margin: "0 0 0 5px" }} /> : <FaMoon style={{ margin: "0 0 0 5px" }} />}
                    </button>

                    <button className="btn" style={{
                        display: 'flex', alignItems: 'center',
                        color: !darkMode ? "#FEC7EE" : "#232323", fontWeight: 600,
                        backgroundColor: !darkMode ? "#232323" : "#FEC7EE"
                    }}
                        onClick={cambiarIdioma} >
                        {idiomaSeleccionado !== "español" ? 'Spanish' : 'Inglés'}
                    </button>

                    <button className="btn btn-danger" onClick={limpiarJuego}>
                        {subtitulos.botonLimpiar}
                    </button>
                </div>

                <div className="eleccion-dificultad">
                    {!dificultad && (
                        <>
                            <div className="dificultad">
                                <p> {subtitulos.dificultadPregunta} </p>
                            </div>
                            <div className="contenedor-iconos">
                                {dificultades.map((dificulty, index) => (
                                    <div className="img" key={index} onClick={() => { seleccionDificultad(dificulty.dificultadLarga); dificultadElegida(dificulty.dificultadCorta) }}>
                                        <div className="imagen">
                                            <img src={dificulty.imagen} alt={dificulty.dificultadCorta} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {dificultad &&
                        <div className="dificultad">
                            <p> {subtitulos.dificultadPalabra}: <span style={{ color: darkMode ? '#2ecc71' : '#34495e' }}> {dificultadActual} </span>  </p>
                        </div>
                    }
                </div>

                <ToastContainer />

                {cards.length === 0 &&
                    <div className='contenedor-espera'>
                        <div className="imagen-espera">
                            <img src="/public/img/pikachu-pensativo.png" alt="Imagen de espera" />
                        </div>
                        <div className="dificultad">
                            <span
                                style={{ color: darkMode ? '#2ecc71' : '#34495e' }}
                            > {subtitulos.eleccionDeDificultad} </span>
                        </div>
                        <div class="spinner-border text-warning" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                }

                <div className="carta" style={{ backgroundColor: darkMode ? 'var(--darkMode-bg)' : 'white', color: darkMode ? 'var(--darkMode-text-color)' : 'black' }}>
                    <div className="contenedor">
                        <div className="imagenes">
                            {cards.map((img, index) => (
                                <ReactCardFlip className='react-card-flip' key={index} isFlipped={flippedIndexes.includes(index) || matchedIndexes.includes(index)} flipDirection="horizontal">
                                    <div className='img img-incognita'
                                        style={{
                                            backgroundImage: darkMode ? 'url("https://i.pinimg.com/564x/2e/5e/6d/2e5e6d2f1a21b8c8cd548cb985b3a725.jpg")' : 'url("/img/fondo-light-mode.jpg")',
                                            WebkitBoxShadow: darkMode ? '-2px 1px 10px 4px #00008B' : '-2px 1px 10px 4px rgba(252, 154, 233, 0.86)',
                                        }}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <img src="https://www.svgrepo.com/show/532555/search.svg" alt="Imagen misteriosa" />
                                    </div>
                                    <div className='img' onClick={() => handleCardClick(index)}
                                        style={{
                                            background: darkMode ? "linear-gradient(to right top, #103f75, #10396a, #0f3260, #0e2c55, #0d264b, #0d2345, #0d1f3e, #0d1c38, #0e1a34, #0e1930, #0f182c, #0f1628)" :
                                                "linear-gradient(to right top, #ffd9f0, #fed3ef, #fecdee, #fcc7ed, #fbc1ec, #f9bceb, #f8b7eb, #f6b2ea, #f4ade9, #f1a8e8, #efa3e7, #ec9ee6)"
                                        }}
                                    >
                                        <img src={img} alt="Imagen elegida" />
                                    </div>
                                </ReactCardFlip>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cards
