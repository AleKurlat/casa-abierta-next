/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CardEvento from '../../componentes/cardEvento.jsx';
import { Link } from 'next/link';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { traerEventos } from "../../librerias/libreriaEventos.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

export default function Eventos(props) {
    const [statePreLoader, preLoaderOn] = useState(false);
    const listadoEventos = useSelector((estado) => estado.eventos);
    const token = useSelector((estado) => estado.token);
    const dispatch = useDispatch();

    async function traerDatos() {
        preLoaderOn(true);
        const listado = await traerEventos();
        preLoaderOn(false);
        if (listado) {
            dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "eventos" });
        }
    }

    useEffect(traerDatos, []);

    let zonaPreLoader;
    if (statePreLoader) {
        zonaPreLoader = preLoader;
    }

    let zonaAdmin;
    if (token) {
        zonaAdmin = <Button color="primary" tag={Link} className="p-3" to="/eventos/agregar">Agregar nuevo evento</Button>
    }

    let zonaListado;
    if (listadoEventos) {
        if (listadoEventos.length > 0) {
            zonaListado = listadoEventos.map((elemento) => {
                return <CardEvento {...props} datosCard={elemento} key={elemento.id} tipo="listado" />
            }).reverse()
        } else {
            zonaListado = <div>Por el momento no hay entradas para mostrar</div>
        }
    }

    return (
        <>
            {zonaAdmin}
            {zonaPreLoader}
            <section id="listadoEventos">
                {zonaListado}
            </section>
        </>
    )
}