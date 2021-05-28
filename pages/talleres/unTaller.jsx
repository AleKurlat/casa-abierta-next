/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Card from './cardTaller.jsx';
import { preLoader } from "../librerias/libreriaApp.jsx";
import { traerUnTaller } from "../librerias/libreriaTalleres.jsx";

export default function UnTaller(props) {
    const params = useParams();
    const [statePreLoader, preLoaderOn] = useState(false);
    const [datosTaller, setDatosTaller] = useState({ nombre: "", descripcion: "", talleristas: "", horarios: "" });

    async function recuperarDatosTaller() {
        preLoaderOn(true);
        const datosCard = await traerUnTaller(params.id);
        preLoaderOn(false);
        if (datosCard) { setDatosTaller(datosCard); }
    }

    useEffect(() => { recuperarDatosTaller() }, []);

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            {zonaPreLoader}
            <section id={"unaCard"}>
                <Card {...props} datosCard={datosTaller} tipo="unaCard" />
            </section>
        </>
    )
}