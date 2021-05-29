import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { guardarEvento } from "../../librerias/libreriaEventos.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';

//import { Button } from 'reactstrap';

export default function AltaEvento(props) {

    const nuevoEventoVacio = { nombre: "", descripcion: "", imagen_url: "", fecha: "" };
    const [nuevoEvento, setNuevoEvento] = useState(nuevoEventoVacio);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const [statePreLoader, preLoaderOn] = useState(false);
    const router = useRouter();

    function handler(e) {
        setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value });
    };

    async function guardarForm(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const resultadoOp = await guardarEvento(nuevoEvento, autorizacion)
        preLoaderOn(false);
        if (resultadoOp) { router.push("/eventos/eventos") };
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <h2>Agregar evento</h2>
            <section id={"nuevoEvento"}>
                <Form className="card2 align-items-stretch text-start" onSubmit={guardarForm}>
                    {zonaPreLoader}
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input className="my-3" type="textarea" name="nombre" value={nuevoEvento.nombre} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input className="my-3" type="textarea" name="descripcion" value={nuevoEvento.descripcion} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>URL de imagen</Label>
                        <Input className="my-3" type="textarea" name="imagen_url" value={nuevoEvento.imagen_url} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Fecha y hora</Label>
                        <Input className="my-3" type="datetime-local" name="fecha" value={nuevoEvento.fecha} onChange={handler} required />
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar evento</Button>
                </Form>
            </section>
        </>
    )
}