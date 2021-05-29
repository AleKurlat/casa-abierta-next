import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { guardarImagen } from "../../librerias/libreriaImagenes.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';

//import { Button } from 'reactstrap';

export default function AltaImagen(props) {

    const nuevaImagenVacia = {
        nombre: "",
        descripcion: "",
        url: ""
    };

    const [nuevaImagen, setNuevaImagen] = useState(nuevaImagenVacia);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const [statePreLoader, preLoaderOn] = useState(false);
    const router = useRouter();

    function handler(e) {
        setNuevaImagen({ ...nuevaImagen, [e.target.name]: e.target.value });
    };

    async function guardarForm(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const resultadoOp = await guardarImagen(nuevaImagen, autorizacion)
        preLoaderOn(false);
        if (resultadoOp) { router.push("/galeria/galeria") };
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <h2>Agregar imagen</h2>
            <section id={"nuevaImagen"}>
                <Form className="card2 align-items-stretch text-start" onSubmit={guardarForm}>
                    {zonaPreLoader}
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input className="my-3" type="textarea" name="nombre" value={nuevaImagen.nombre} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <Input className="my-3" type="textarea" name="descripcion" value={nuevaImagen.descripcion} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>URL de imagen</Label>
                        <Input className="my-3" type="textarea" name="url" value={nuevaImagen.url} onChange={handler} required />
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar imagen</Button>
                </Form>
            </section>
        </>
    )
}