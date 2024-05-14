import { create } from "zustand";

const storeZustand = create((set) => ({
    darkMode: localStorage.getItem('darkModeMemoryGame') === 'true',
    toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        localStorage.setItem('darkModeMemoryGame', newDarkMode);
        return { darkMode: newDarkMode };
    }),
    idiomaSeleccionado: localStorage.getItem('idiomaMemoryGame') || "ingles",
    cambiarIdioma: () => set((state) => {
        const changeState = state.idiomaSeleccionado === "español" ? "ingles" : "español";
        localStorage.setItem('idiomaMemoryGame', changeState);
        return { idiomaSeleccionado: changeState }
    })
}));

export default storeZustand;