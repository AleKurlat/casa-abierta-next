import React, { useState } from 'react';
import Link from 'next/link';
import { preLoader, extracto } from "../librerias/libreriaApp.jsx";
import { borrarImagen, traerImagenes } from "../librerias/libreriaImagenes.jsx";
import EditarDestacado from './editarDestacado.jsx';
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Contacto from './contacto.jsx';
import Cuadro from "./cuadro"

export default function CardImagen(props) {

    const datos = props.datosCard;
    const rutaImagen = "/galeria/imagen/" + datos.id;
    const rutaIr = rutaImagen + "#principal"
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();

    async function borrado() {
        preLoaderOn(true);
        const resultadoOp = await borrarImagen(datos.id, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) {
            preLoaderOn(true);
            const listado = await traerImagenes();
            preLoaderOn(false);
            if (listado) { dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "imagenes" }); }
        }
    }

    let zonaAdmin;
    let botones;

    if (token && props.tipo === "listado") {
        zonaAdmin =
            <div className="botoneraCard d-flex flex-row mt-2">
                <Link href={rutaImagen + "/editar#principal"}><Button className="me-2 flex-grow-1" color="primary">Editar</Button></Link>
                <Button className="flex-grow-1" color="danger" onClick={borrado}>Eliminar</Button>
            </div>
    }

    if (props.tipo === "listado" || props.tipo === "editarDestacados") {
        botones =
            <div className="botoneraCard d-flex flex-wrap">
                <div className="flex-grow-1">
                    <Link href={rutaIr}><Button className="flex-grow-1 w-100" color="primary" >Ver en tamaño completo</Button></Link>
                </div>
                {zonaAdmin}
            </div>
    }

    let claseContenedor;
    let zonaDescripcion;
    let tituloCard;
    let zonaContacto;
    let textoCard;
    let tamañoCard = "";

    let zonaDestacados;
    if (props.tipo === "editarDestacados" && token) {
        zonaDestacados = <EditarDestacado i={props.i} />
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    if (props.tipo === "unaCard") {
        tituloCard = "tituloCardGrande";
        claseContenedor = "contenedorImagenGrande";
        zonaContacto = <Contacto />
        zonaDescripcion = datos.descripcion;
        tamañoCard = "cardGrande";
        botones = <Link href="/galeria/galeria#menuNav"><Button className="flex-grow-1 w-100" color="primary">Volver a galería</Button></Link>
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
        <article className={"card2 " + tamañoCard} id={datos.id}>
            <div className={textoCard}>
                <Link href={rutaIr}><a style={{ textDecoration: "none" }} > <h2 className={tituloCard}>{datos.nombre}</h2></a></Link>
                <div className="my-2">{zonaDescripcion}</div>
                {zonaContacto}
            </div>
            <div>
                <Link href={rutaIr}><a ><div className={claseContenedor}><img src={datos.url} alt={datos.nombre} /></div></a></Link>
                {listadoAdjuntos}
                {botones}
                {zonaDestacados}
                {zonaPreLoader}
            </div>
        </article>
    )
}