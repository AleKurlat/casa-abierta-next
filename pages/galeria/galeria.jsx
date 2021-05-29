/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CardImagen from '../../componentes/cardImagen.jsx';
import { Link } from 'next/link';
import { preLoader, urlImgDestacada } from "../../librerias/libreriaApp.jsx";
import { traerImagenes } from "../../librerias/libreriaImagenes.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import Head from 'next/head';

export default function Galeria(props) {
    const [statePreLoader, preLoaderOn] = useState(false);
    const listadoImagenes = useSelector((estado) => estado.imagenes);
    const token = useSelector((estado) => estado.token);
    const dispatch = useDispatch();
    const [zonaAdmin, setZonaAdmin] = useState();

    async function traerDatos() {
        preLoaderOn(true);
        const listado = await traerImagenes();
        preLoaderOn(false);
        if (listado) { dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "imagenes" }); }
    }

    useEffect(traerDatos, []);
    useEffect(() => {
        if (token) {
            let barraAdmin = <Button color="primary" tag={Link} className="p-3" href="/galeria/agregar">Agregar nueva imagen</Button>
            setZonaAdmin(barraAdmin);
        }
    }, [token]);

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    let zonaListado;
    if (listadoImagenes) {
        if (listadoImagenes.length > 0) {
            zonaListado = listadoImagenes.map((elemento) => {
                return <CardImagen {...props} datosCard={elemento} key={elemento.id} tipo="listado" />
            }).reverse()
        } else {
            zonaListado = <div>Por el momento no hay entradas para mostrar</div>
        }
    }

    return (
        <>
            <Head>
                <title>Galería de Casa Abierta</title>
                <meta name="description" content="Galería de imágenes del Centro Cultural Casa Abierta" />
                <meta property="og:title" content="Galería de Casa Abierta" />
                <meta property="og:description" content="Galería de imágenes del Centro Cultural Casa Abierta" />
                <meta name="twitter:title" content="Galería de Casa Abierta" />
                <meta name="twitter:description" content="Galería de imágenes del Centro Cultural Casa Abierta" />
                <meta property="og:image" content={urlImgDestacada} />
                <meta name="twitter:image" content={urlImgDestacada} />
            </Head>
            {zonaAdmin}
            {zonaPreLoader}
            <section id="Galeria">
                {zonaListado}
            </section>
        </>
    )
}