/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CardEvento from '../../componentes/cardEvento.jsx';
import { Link } from 'next/link';
import { preLoader, urlImgDestacada } from "../../librerias/libreriaApp.jsx";
import { traerEventos } from "../../librerias/libreriaEventos.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import Head from 'next/head';

export default function Eventos(props) {
    const [statePreLoader, preLoaderOn] = useState(false);
    const listadoEventos = useSelector((estado) => estado.eventos);
    const token = useSelector((estado) => estado.token);
    const dispatch = useDispatch();
    const [zonaAdmin, setZonaAdmin] = useState();

    async function traerDatos() {
        preLoaderOn(true);
        const listado = await traerEventos();
        preLoaderOn(false);
        if (listado) {
            dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "eventos" });
        }
    }

    useEffect(traerDatos, []);
    useEffect(() => {
        if (token) {
            let barraAdmin = <Button color="primary" tag={Link} className="p-3" href="/eventos/altaEvento">Agregar nuevo evento</Button>
            setZonaAdmin(barraAdmin);
        }
    }, [token]);

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader }

    let zonaListado;
    if (listadoEventos) {
        if (listadoEventos.length > 0) {
            zonaListado = listadoEventos.map((elemento) => {
                return <CardEvento {...props} datosCard={elemento} key={elemento.id} tipo="listado" />
            }).reverse()
        } else {
            zonaListado = <div className="card2">Por el momento no hay entradas para mostrar</div>
        }
    }

    return (
        <>
            <Head>
                <title>Eventos en Casa Abierta</title>
                <meta name="description" content="Eventos en el Centro Cultural Casa Abierta" />
                <meta property="og:title" content="Eventos en Casa Abierta" />
                <meta property="og:description" content="Eventos en el Centro Cultural Casa Abierta" />
                <meta name="twitter:title" content="Eventos en Casa Abierta" />
                <meta name="twitter:description" content="Eventos en el Centro Cultural Casa Abierta" />
                <meta property="og:image" content={urlImgDestacada} />
                <meta name="twitter:image" content={urlImgDestacada} />
            </Head>
            {zonaAdmin}
            {zonaPreLoader}
            <section id="listadoEventos">
                {zonaListado}
            </section>
        </>
    )
}