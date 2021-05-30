import React, { useState } from 'react';
import Link from 'next/link';
import { preLoader, extracto } from "../librerias/libreriaApp.jsx";
import { borrarEvento, traerEventos } from "../librerias/libreriaEventos.jsx";
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Contacto from './contacto.jsx';
import EditarDestacado from './editarDestacado.jsx';

export default function CardEvento(props) {

    const datos = props.datosCard;
    const rutaEvento = "/eventos/evento/" + datos.id;
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();

    let fecha;
    let dia;
    let horas;
    if (datos.fecha) {
        fecha = new Date(datos.fecha);
        dia = fecha.toLocaleString().substring(0, 9);
        horas = fecha.toLocaleString().substring(9, 15);
    }

    async function borrado() {
        preLoaderOn(true);
        const resultadoOp = await borrarEvento(datos.id, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) {
            preLoaderOn(true);
            const listado = await traerEventos();
            preLoaderOn(false);
            if (listado) { dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "eventos" }); }
        }
    }

    let zonaAdmin;
    let botones;

    if (token && props.tipo === "listado") {
        zonaAdmin =
            <div className="botoneraCard d-flex flex-row mt-2">
                <Link href={rutaEvento + "/editar"}><Button className="me-2 flex-grow-1" color="primary" >Editar</Button></Link>
                <Button className="flex-grow-1" color="danger" onClick={borrado}>Eliminar</Button>
            </div>
    }

    if (props.tipo === "listado" || props.tipo === "editarDestacados") {
        botones =
            <div className="botoneraCard d-flex flex-wrap">
                <div className="flex-grow-1">
                    <Link href={rutaEvento}><Button className="flex-grow-1 w-100" color="primary" >Ver información del evento</Button></Link>
                </div>
                {zonaAdmin}
            </div>
    }

    let zonaDestacados;
    if (props.tipo === "editarDestacados" && token) {
        zonaDestacados = <EditarDestacado i={props.i} />
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    let zonaDescripcion;
    let claseContenedor;
    let zonaContacto;
    let tituloCard;
    let textoCard;
    let tamañoCard = "";

    if (props.tipo === "unaCard") {
        tituloCard = "tituloCardGrande";
        claseContenedor = "contenedorImagenGrande";
        zonaContacto = <Contacto />
        zonaDescripcion = datos.descripcion;
        tamañoCard = "cardGrande";
    } else {
        tituloCard = "tituloCard";
        claseContenedor = "contenedorImagen";
        zonaDescripcion = extracto(datos.descripcion);
        textoCard = "textoCard";
    }

    return (
        <article className={"card2 " + tamañoCard} id={datos.id}>
            <div className={textoCard}>
                <Link href={rutaEvento}><a style={{ textDecoration: "none" }}><h2 className={tituloCard}>{datos.nombre}</h2></a></Link>
                <div className="text-center">
                    <h5>{dia}</h5>
                    <h6>{horas}</h6>
                </div>
                <div className="my-2">{zonaDescripcion}</div>
                {zonaContacto}
            </div>
            <div className={claseContenedor}><img src={datos.imagen_url} alt={datos.nombre} /></div>
            <div>
                {botones}
                {zonaDestacados}
                {zonaPreLoader}
            </div>
        </article>
    )
}