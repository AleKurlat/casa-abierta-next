import React, { useState } from 'react';
import Link from 'next/link';
import { preLoader, extracto } from "../librerias/libreriaApp.jsx";
import { borrarTaller, traerTalleres } from "../librerias/libreriaTalleres.jsx";
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Contacto from './contacto.jsx';
import EditarDestacado from './editarDestacado.jsx';

export default function Card(props) {

    const datos = props.datosCard;
    const rutaTaller = "/talleres/taller/" + datos.id;
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();

    async function borrado() {
        preLoaderOn(true);
        const resultadoOp = await borrarTaller(datos.id, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) {
            preLoaderOn(true);
            const listado = await traerTalleres();
            preLoaderOn(false);
            if (listado) { dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "talleres" }); }
        }
    }

    let zonaAdmin;
    let botones;

    if (token && props.tipo === "listado") {
        zonaAdmin =
            <div className="botoneraCard d-flex flex-row mt-2">
                <Link href={rutaTaller + "/editar"} ><Button className="me-2 flex-grow-1" color="primary">Editar</Button></Link>
                <Button className="flex-grow-1" color="danger" onClick={borrado}>Eliminar</Button>
            </div>
    }

    if (props.tipo === "listado" || props.tipo === "editarDestacados") {
        botones =
            <div className="botoneraCard d-flex flex-row flex-wrap">
                <div className="flex-grow-1">
                    <Link href={rutaTaller} ><Button className="flex-grow-1 w-100" color="primary"  >Ver información del taller</Button></Link>
                </div>
                {zonaAdmin}
            </div>
    }

    let claseContenedor;
    let tituloCard;
    let zonaContacto;
    let zonaDescripcion;
    let textoCard;
    let tamañoCard = "";

    if (props.tipo === "unaCard") {
        tituloCard = "tituloCardGrande";
        claseContenedor = "contenedorImagenGrande";
        zonaContacto = <Contacto />
        zonaDescripcion = datos.descripcion;
        tamañoCard = "cardGrande";
        botones = <Link href="/talleres/talleres" ><Button className="flex-grow-1 w-100" color="primary">Volver a talleres</Button></Link>
        textoCard = "textoCardGrande";
    } else {
        tituloCard = "tituloCard";
        claseContenedor = "contenedorImagen";
        zonaDescripcion = extracto(datos.descripcion);
        textoCard = "textoCard";
    }

    let zonaDestacados;
    if (props.tipo === "editarDestacados" && token) {
        zonaDestacados = <EditarDestacado i={props.i} />
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <article className={"card2 " + tamañoCard} id={datos.id}>
            <div className={textoCard}>
                <Link href={rutaTaller}><a style={{ textDecoration: "none" }}><h2 className={tituloCard}>{datos.nombre}</h2></a></Link>
                <div className="">
                    <div><strong>Talleristas:</strong>  {datos.talleristas}</div>
                    <div><strong>Horarios:</strong>  {datos.horarios}</div>
                </div>
                <div className="my-2">{zonaDescripcion}</div>
                {zonaContacto}
            </div>
            <div>
                <div className={claseContenedor}><img src={datos.imagen_url} alt={datos.nombre} /></div>
                {botones}
                {zonaDestacados}
                {zonaPreLoader}
            </div>
        </article>
    )
}