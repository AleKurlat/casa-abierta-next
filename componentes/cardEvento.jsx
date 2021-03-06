import React, { useState } from 'react';
import Link from 'next/link';
import { preLoader, extracto } from "../librerias/libreriaApp.jsx";
import { borrarEvento, traerEventos } from "../librerias/libreriaEventos.jsx";
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Contacto from './contacto.jsx';
import EditarDestacado from './editarDestacado.jsx';
import Cuadro from "./cuadro"

export default function CardEvento(props) {

    const datos = props.datosCard;
    const rutaEvento = "/eventos/evento/" + datos.id;
    const rutaIr = rutaEvento + "#principal"
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();

    let fecha;
    let dia;
    let horas;
    if (datos.fecha) {
        fecha = new Date(datos.fecha);
        const fechaLocal = fecha.toLocaleString();
        const fechaPartes = fechaLocal.split(" ");
        dia = fechaPartes[0];
        const horas1 = fechaPartes[1];
        horas = horas1.trim().substring(0, 5);
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
                <Link href={rutaEvento + "/editar#principal"}><Button className="me-2 flex-grow-1" color="primary" >Editar</Button></Link>
                <Button className="flex-grow-1" color="danger" onClick={borrado}>Eliminar</Button>
            </div>
    }

    if (props.tipo === "listado" || props.tipo === "editarDestacados") {
        botones =
            <div className="botoneraCard d-flex flex-wrap">
                <div className="flex-grow-1">
                    <Link href={rutaIr}><Button className="flex-grow-1 w-100" color="primary" >Ver informaci??n del evento</Button></Link>
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
    let tama??oCard = "";

    if (props.tipo === "unaCard") {
        tituloCard = "tituloCardGrande";
        claseContenedor = "contenedorImagenGrande";
        zonaContacto = <Contacto />
        zonaDescripcion = datos.descripcion;
        tama??oCard = "cardGrande";
        botones = <Link href="/eventos/eventos#menuNav"><Button className="flex-grow-1 w-100" color="primary">Volver a eventos</Button></Link>
        textoCard = "textoCardGrande";
    } else {
        tituloCard = "tituloCard";
        claseContenedor = "contenedorImagen";
        zonaDescripcion = extracto(datos.descripcion);
        textoCard = "textoCard";
    }

    let listadoAdjuntos;
    if (datos.adjuntos && datos.adjuntos.length > 0 && props.tipo === "unaCard") {
        listadoAdjuntos = datos.adjuntos.map((elem, index) => { return <Cuadro key={index} fuente={elem} /> })
    }

    return (
        <article className={"card2 " + tama??oCard} id={datos.id}>
            <div className={textoCard}>
                <Link href={rutaIr}><a style={{ textDecoration: "none" }}><h2 className={tituloCard}>{datos.nombre}</h2></a></Link>
                <div className="text-center">
                    <h5>{dia}</h5>
                    <h6>{horas}</h6>
                </div>
                <div className="my-2">{zonaDescripcion}</div>
                {zonaContacto}
            </div>
            <div>
                <Link href={rutaIr}><a><div className={claseContenedor}><img src={datos.imagen_url} alt={datos.nombre} /></div></a></Link>
                {listadoAdjuntos}
                {botones}
                {zonaDestacados}
                {zonaPreLoader}
            </div>
        </article>
    )
}