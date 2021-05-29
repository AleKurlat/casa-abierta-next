/* eslint-disable react-hooks/exhaustive-deps */
import { preLoader } from "../librerias/libreriaApp.jsx";
import { guardarDestacados, traerDestacados } from "../librerias/libreriaDestacados.jsx";
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

export default function EditarDestacado(props) {

    const [statePreLoader, preLoaderOn] = useState(false);
    const arrayDestacados = useSelector((estado) => estado.destacados);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();

    async function modificarDestacados(arrayDestacados) {
        preLoaderOn(true);
        const resultadoOp = await guardarDestacados(arrayDestacados, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) {
            preLoaderOn(true);
            const listado = await traerDestacados();
            preLoaderOn(false);
            if (listado) {
                dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "destacados" });
            }
        }
    }

    function quitarDestacado(i) {
        let arrayProvisorio = [...arrayDestacados].filter((elemento, j) => {
            return (j !== i)
        });
        modificarDestacados(arrayProvisorio);
    }

    async function subirOrden(viejoOrden) {
        let elementoMovido = [...arrayDestacados][viejoOrden];
        let arrayProvisorio = [...arrayDestacados].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = 0;
        if (viejoOrden > 0) { nuevoOrden = viejoOrden - 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        modificarDestacados(arrayProvisorio);
    }

    function bajarOrden(viejoOrden) {
        const cantDestacados = arrayDestacados.length;
        let elementoMovido = [...arrayDestacados][viejoOrden];
        let arrayProvisorio = [...arrayDestacados].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = cantDestacados - 1;
        if (viejoOrden < (cantDestacados - 1)) { nuevoOrden = viejoOrden + 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        modificarDestacados(arrayProvisorio);
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <div className="botoneraCard d-flex mt-2">
                <Button className="flex-grow-1" color="warning" onClick={() => { subirOrden(props.i) }}>Subir</Button>
                <Button className="flex-grow-1 mx-2" color="warning" onClick={() => { bajarOrden(props.i) }}>Bajar</Button>
                <Button className="flex-grow-1" color="danger" onClick={() => { quitarDestacado(props.i) }}>Quitar</Button>
            </div>
            {zonaPreLoader}
        </>
    );
}