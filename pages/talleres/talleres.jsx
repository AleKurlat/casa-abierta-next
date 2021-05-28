/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from '../../componentes/cardTaller.jsx';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { traerTalleres } from "../../librerias/libreriaTalleres.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import Link from 'next/link';

export default function Talleres(props) {
    const [statePreLoader, preLoaderOn] = useState(false);
    const listadoTalleres = useSelector((estado) => estado.talleres);
    const token = useSelector((estado) => estado.token);
    const dispatch = useDispatch();

    async function traerDatos() {
        preLoaderOn(true);
        const listado = await traerTalleres();
        preLoaderOn(false);
        if (listado) {
            dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "talleres" });
        }
    }

    useEffect(traerDatos, []);

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    let zonaAdmin;
    if (token) {
        zonaAdmin = <Button color="primary" className="p-3" tag={Link} to="/talleres/agregar">Agregar nuevo taller</Button>
    }

    let zonaListado;
    if (listadoTalleres) {
        if (listadoTalleres.length > 0) {
            zonaListado = listadoTalleres.map((elemento) => {
                return <Card {...props} datosCard={elemento} key={elemento.id} tipo="listado" />
            }).reverse()
        } else {
            zonaListado = <div>Por el momento no hay entradas para mostrar</div>
        }
    }

    return (
        <>
            {zonaAdmin}
            {zonaPreLoader}
            <section id="listadoTalleres">
                {zonaListado}
            </section>
        </>
    )
}