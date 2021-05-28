/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Card from '../../componentes/cardTaller.jsx';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { traerUnTaller } from "../../librerias/libreriaTalleres.jsx";

export default function UnTaller(props) {
    const router = useRouter();
    const [statePreLoader, preLoaderOn] = useState(false);
    const [datosTaller, setDatosTaller] = useState({ nombre: "", descripcion: "", talleristas: "", horarios: "" });

    async function recuperarDatosTaller() {
        const { id } = router.query;
        console.log(id);
        preLoaderOn(true);
        const datosCard = await traerUnTaller(id);
        preLoaderOn(false);
        if (datosCard) { setDatosTaller(datosCard); }
    }

    useEffect(() => {
        if (!router.isReady) return;
        recuperarDatosTaller();
    }, [router.isReady]);

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    let zonaCard
    if (datosTaller) {
        zonaCard = <section id={"unaCard"}>
            <Card {...props} datosCard={datosTaller} tipo="unaCard" />
        </section>
    }
    return (
        <>
            {zonaPreLoader}
            {zonaCard}
        </>
    )
}