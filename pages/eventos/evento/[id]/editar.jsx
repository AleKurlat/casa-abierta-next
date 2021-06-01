/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { preLoader } from "../../../../librerias/libreriaApp.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { editarEvento, traerEventos, traerUnEvento } from "../../../../librerias/libreriaEventos.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function EditarEvento(props) {
    const [dataForm, setDataForm] = useState({ nombre: "", descripcion: "", imagen_url: "", fecha: "" });
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    async function recuperarDatosEvento() {
        preLoaderOn(true);
        const datosCard = await traerUnEvento(id);
        preLoaderOn(false);
        if (datosCard) {
            let fechaFormateada = new Date(new Date(datosCard.fecha).toString().split('GMT')[0] + ' UTC').toISOString().substring(0, 16);
            datosCard.fecha = fechaFormateada;
            setDataForm(datosCard);
        }
    }

    useEffect(() => {
        if (!router.isReady) return;
        recuperarDatosEvento();
    }, [router.isReady]);

    function handler(e) {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    }

    async function guardarCambios(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const resultadoOp = await editarEvento(id, dataForm, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) {
            preLoaderOn(true);
            const listado = await traerEventos();
            preLoaderOn(false);
            if (listado) {
                dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "eventos" });
                volverAtras();
            }
        }
    }

    function volverAtras() {
        router.push("/eventos/eventos#principal");
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <h2>Editar evento</h2>
            <section id={"editarCard" + id}>
                <Form className="card2 align-items-stretch text-start" onSubmit={guardarCambios}>
                    {zonaPreLoader}
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input className="my-3" type="textarea" name="nombre" value={dataForm.nombre} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input className="my-3" type="textarea" name="descripcion" value={dataForm.descripcion} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>URL de imagen</Label>
                        <Input className="my-3" type="textarea" name="imagen_url" value={dataForm.imagen_url} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Fecha y hora</Label>
                        <Input className="my-3" type="datetime-local" name="fecha" value={dataForm.fecha} onChange={handler} required />
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar cambios</Button>
                    <Button className="mt-3" color="primary" size="lg" onClick={volverAtras}>Cancelar</Button>
                </Form>
            </section>
        </>
    )
}