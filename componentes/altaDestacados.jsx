/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { guardarDestacados, traerDestacados } from "../librerias/libreriaDestacados.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'reactstrap';

export default function Home(props) {
    const [estadoListado, setEstadoListado] = useState();
    const preLoaderOn = props.preLoaderOn;
    const listadoImagenes = useSelector((estado) => estado.imagenes);
    const listadoTalleres = useSelector((estado) => estado.talleres);
    const listadoEventos = useSelector((estado) => estado.eventos);
    const arrayDestacados = useSelector((estado) => estado.destacados);
    const [estadoElegirTipo, setEstadoElegirTipo] = useState();
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();

    async function modificarDestacados(arrayDestacados) {
        const resultadoOp = await guardarDestacados(arrayDestacados, autorizacion);
        if (resultadoOp) {
            if (resultadoOp === 403) {
                dispatch({ type: 'GUARDAR_TOKEN', token: "" });
            } else {
                const listado = await traerDestacados();
                if (listado) {
                    dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "destacados" });
                }
            }
        }
    }

    async function filtrarDestacados() {
        const arrayProvisorio = [...arrayDestacados].filter((elemento, i) => {
            let listado;
            switch (elemento.tipoListado) {
                case "Talleres": listado = listadoTalleres; break;
                case "Imagenes": listado = listadoImagenes; break;
                case "Eventos": listado = listadoEventos; break;
                default: return "";
            }
            return listado.find(unDestacado => { return (unDestacado.id == elemento.id) });
        })
        await modificarDestacados(arrayProvisorio);
    }

    useEffect(filtrarDestacados, []);

    async function agregarDestacado(e, tipoListado) {
        e.preventDefault();
        const encontreRepetido = arrayDestacados.find(elemento => {
            return (
                elemento.tipoListado == estadoElegirTipo && elemento.id == estadoListado
            )
        })
        if (!encontreRepetido) {
            let arrayProvisorio = [...arrayDestacados];
            arrayProvisorio.unshift({ tipoListado: tipoListado, id: estadoListado });
            preLoaderOn(true);
            await modificarDestacados(arrayProvisorio);
            preLoaderOn(false);
        } else {
            alert("Este elemento ya se había ingresado previamente");
        }
    }

    function formHandler(e) {
        setEstadoListado(e.target.value);
    }

    function formHandler2(e) {
        setEstadoElegirTipo(e.target.value);
    }

    let elegirTipo =
        <Input className="mb-2 ms-2 flex-grow-1" type="select" value={estadoElegirTipo} onChange={formHandler2} required>
            <option value="">Elegir listado</option>
            <option >Talleres</option>
            <option >Imagenes</option>
            <option >Eventos</option>
        </Input>

    let dropdown;
    if (estadoElegirTipo === "Talleres" && listadoTalleres) {
        dropdown = listadoTalleres.map((elemento) => {
            return (
                <option value={elemento.id} key={elemento.id}>{elemento.nombre}</option>
            )
        })
    }
    if (estadoElegirTipo === "Imagenes" && listadoImagenes) {
        dropdown = listadoImagenes.map((elemento) => {
            return (
                <option value={elemento.id} key={elemento.id}>{elemento.nombre}</option>
            )
        })
    }
    if (estadoElegirTipo === "Eventos" && listadoEventos) {
        dropdown = listadoEventos.map((elemento) => {
            return (
                <option value={elemento.id} key={elemento.id}>{elemento.nombre}</option>
            )
        })
    }

    let formAgregarDestacado;
    let botonAgregar;
    if (estadoElegirTipo) {
        formAgregarDestacado =
            <Form id="myform" className="ms-2 flex-grow-1" onSubmit={(e) => { agregarDestacado(e, estadoElegirTipo) }}>
                <Input className="mb-2 w-100" type="select" onChange={formHandler} value={estadoListado} required>
                    <option value="" className="noElegible">Elegir elemento</option>
                    {dropdown}
                </Input>
            </Form>
        botonAgregar = <div><Button type="submit" color="primary" form="myform" className="p-3" >Agregar a destacados</Button></div>
    }

    return (
        <>
            <h5>Agregar a destacados</h5>
            <div id="desplegableDestacados" className="d-flex flex-wrap" style={{ marginLeft: "-.5rem" }}>
                {elegirTipo}
                {formAgregarDestacado}
            </div>
            {botonAgregar}
        </>
    )
}