import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { guardarTaller } from "../../librerias/libreriaTalleres.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

//import { Button } from 'reactstrap';

export default function AltaTaller(props) {

    const nuevoTallerVacio = { nombre: "", descripcion: "", talleristas: "", horarios: "", imagen_url: "" };
    const [adjuntos, setAdjuntos] = useState(["aa"]);
    const [nuevoTaller, setNuevoTaller] = useState(nuevoTallerVacio);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const [statePreLoader, preLoaderOn] = useState(false);
    const router = useRouter();

    function handler(e) {
        setNuevoTaller({ ...nuevoTaller, [e.target.name]: e.target.value });
    };

    function handlerAdjunto(e, i) {
        const adjuntosProvisorio = [...adjuntos]
        adjuntosProvisorio[i] = e.target.value;
        setAdjuntos(adjuntosProvisorio);
    };

    async function guardarForm(evento) {
        evento.preventDefault();
        const nuevoTallerConAdj = { ...nuevoTaller };
        nuevoTallerConAdj.adjuntos = JSON.stringify(adjuntos);
        preLoaderOn(true);
        const resultadoOp = await guardarTaller(nuevoTallerConAdj, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) { router.push("/talleres/talleres#principal") };
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    const listaAdjuntos = adjuntos.map((elem, i) => {
        return <Input key={i} className="my-3" type="textarea" name="adjuntos" value={elem} onChange={(e) => handlerAdjunto(e, i)} />
    })

    return (
        <>
            <h2>Agregar taller</h2>
            <section id={"nuevoTaller"}>
                <Form className="card2 align-items-stretch text-start" onSubmit={guardarForm}>
                    {zonaPreLoader}
                    <FormGroup>
                        <Label>
                            Nombre
                        </Label>
                        <Input className="my-3" type="textarea" name="nombre" value={nuevoTaller.nombre} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Descripción
                        </Label>
                        <Input className="my-3" type="textarea" name="descripcion" value={nuevoTaller.descripcion} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Talleristas
                        </Label>
                        <Input className="my-3" type="textarea" name="talleristas" value={nuevoTaller.talleristas} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Horarios
                        </Label>
                        <Input className="my-3" type="textarea" name="horarios" value={nuevoTaller.horarios} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            URL de imagen
                        </Label>
                        <Input className="my-3" type="textarea" name="imagen_url" value={nuevoTaller.imagen_url} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            URL de adjuntos (Instagram, etc.)
                        </Label>
                        {listaAdjuntos}
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar taller</Button>
                    <Link href="/talleres/talleres#principal" passHref ><Button className="mt-3" color="primary" size="lg">Cancelar</Button></Link>
                </Form>
            </section>
        </>
    )
}