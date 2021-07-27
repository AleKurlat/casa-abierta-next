import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { guardarEvento } from "../../librerias/libreriaEventos.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AltaEvento(props) {

    const nuevoEventoVacio = { nombre: "", descripcion: "", imagen_url: "", fecha: "" };
    const [nuevoEvento, setNuevoEvento] = useState(nuevoEventoVacio);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const [statePreLoader, preLoaderOn] = useState(false);
    const router = useRouter();
    const [adjuntos, setAdjuntos] = useState([]);

    function handler(e) {
        setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value });
    };

    function handlerAdjunto(e, i) {
        const adjuntosProvisorio = [...adjuntos]
        adjuntosProvisorio[i] = e.target.value;
        setAdjuntos(adjuntosProvisorio);
    };

    async function guardarForm(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const nuevoEventoConAdj = { ...nuevoEvento };
        nuevoEventoConAdj.adjuntos = JSON.stringify(adjuntos);
        const resultadoOp = await guardarEvento(nuevoEventoConAdj, autorizacion)
        preLoaderOn(false);
        if (resultadoOp) { router.push("/eventos/eventos#principal") };
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    const listaAdjuntos = adjuntos.map((elem, i) => {
        return (
            <div key={i} className="d-flex" >
                <Input className="my-3" type="textarea" name="adjuntos" value={elem} onChange={(e) => handlerAdjunto(e, i)} />
                <Button className="m-2 align-self-center" color="danger" onClick={() => {
                    let adjuntosProvisorio = [...adjuntos];
                    adjuntosProvisorio = adjuntosProvisorio.filter((_, elemIndex) => { return elemIndex !== i })
                    setAdjuntos(adjuntosProvisorio)
                }}>X</Button>
            </div>)
    })

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
                    <FormGroup>
                        <Label>
                            URL de adjuntos (Instagram, etc.)
                        </Label>
                        <Button className="mt-3 w-100" color="info" onClick={() => {
                            const adjuntosProvisorio = [...adjuntos];
                            adjuntosProvisorio.push("");
                            setAdjuntos(adjuntosProvisorio)
                        }}>Agregar nuevo adjunto</Button>
                        {listaAdjuntos}
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar evento</Button>
                    <Link href="/eventos/eventos#principal" passHref ><Button className="mt-3" color="primary" size="lg">Cancelar</Button></Link>
                </Form>
            </section>
        </>
    )
}