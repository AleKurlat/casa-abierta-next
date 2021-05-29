import React, { useState } from 'react';
import { Link } from 'next/link';
import { preLoader, extracto } from "../librerias/libreriaApp.jsx";
import { borrarImagen, traerImagenes } from "../librerias/libreriaImagenes.jsx";
import EditarDestacado from './editarDestacado.jsx';
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import Contacto from './contacto.jsx';

export default function CardImagen(props) {

    const datos = props.datosCard;
    const rutaImagen = "/galeria/imagen/" + datos.id;
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
                <Button className="me-2 flex-grow-1" color="primary" tag={Link} href={rutaImagen + "/editar"}>Editar</Button>
                <Button className="flex-grow-1" color="danger" onClick={borrado}>Eliminar</Button>
            </div>
    }

    if (props.tipo === "listado" || props.tipo === "editarDestacados") {
        botones =
            <div className="botoneraCard d-flex flex-wrap">
                <div className="flex-grow-1">
                    <Button className="flex-grow-1 w-100" color="primary" tag={Link} href={rutaImagen}>Ver en tamaño grande</Button>
                </div>
                {zonaAdmin}
            </div>
    }

    let claseContenedor;
    let zonaDescripcion;
    let tituloCard;
    let zonaContacto;

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
    } else {
        tituloCard = "tituloCard";
        claseContenedor = "contenedorImagen";
        zonaDescripcion = extracto(datos.descripcion);
    }

    return (
        <article className="card2" id={datos.id}>
            <div>
                <div><h2 className={tituloCard}>{datos.nombre}</h2></div>
                <div className="my-2">{zonaDescripcion}</div>
                {zonaContacto}
            </div>
            <div className={claseContenedor}><img src={datos.url} alt={datos.nombre} /></div>
            <div>
                {botones}
                {zonaDestacados}
                {zonaPreLoader}
            </div>
        </article>
    )
}