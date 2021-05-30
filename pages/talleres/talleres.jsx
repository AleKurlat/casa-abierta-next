/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from '../../componentes/cardTaller.jsx';
import { Link } from 'next/link';
import { preLoader, urlImgDestacada } from "../../librerias/libreriaApp.jsx";
import { traerTalleres } from "../../librerias/libreriaTalleres.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import Head from 'next/head';

export default function Talleres(props) {
    const [statePreLoader, preLoaderOn] = useState(false);
    const listadoTalleres = useSelector((estado) => estado.talleres);
    const token = useSelector((estado) => estado.token);
    const dispatch = useDispatch();
    const [zonaAdmin, setZonaAdmin] = useState();

    async function traerDatos() {
        preLoaderOn(true);
        const listado = await traerTalleres();
        preLoaderOn(false);
        if (listado) {
            dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "talleres" });
        }
    }

    useEffect(traerDatos, []);
    useEffect(() => {
        if (token) {
            let barraAdmin = <Button color="primary" tag={Link} className="p-3" href="/talleres/altaTaller">Agregar nuevo taller</Button>
            setZonaAdmin(barraAdmin);
        }
    }, [token]);

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };



    let zonaListado;
    if (listadoTalleres) {
        if (listadoTalleres.length > 0) {
            zonaListado = listadoTalleres.map((elemento) => {
                return <Card {...props} datosCard={elemento} key={elemento.id} tipo="listado" />
            }).reverse()
        } else {
            zonaListado = <div className="card2">Por el momento no hay entradas para mostrar</div>
        }
    }

    return (
        <>
            <Head>
                <title>Talleres en Casa Abierta</title>
                <meta name="description" content="Talleres en el Centro Cultural Casa Abierta" />
                <meta property="og:title" content="Talleres en Casa Abierta" />
                <meta property="og:description" content="Talleres en el Centro Cultural Casa Abierta" />
                <meta name="twitter:title" content="Talleres en Casa Abierta" />
                <meta name="twitter:description" content="Talleres en el Centro Cultural Casa Abierta" />
                <meta property="og:image" content={urlImgDestacada} />
                <meta name="twitter:image" content={urlImgDestacada} />
            </Head>
            {zonaAdmin}
            {zonaPreLoader}
            <section id="listadoTalleres">
                {zonaListado}
            </section>
        </>
    )
}