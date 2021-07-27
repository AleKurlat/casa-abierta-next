import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { guardarImagen } from "../../librerias/libreriaImagenes.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    const [adjuntos, setAdjuntos] = useState([]);

    function handler(e) {
        setNuevaImagen({ ...nuevaImagen, [e.target.name]: e.target.value });
    };

    function handlerAdjunto(e, i) {
        const adjuntosProvisorio = [...adjuntos]
        adjuntosProvisorio[i] = e.target.value;
        setAdjuntos(adjuntosProvisorio);
    };

    async function guardarForm(evento) {
        evento.preventDefault();
        const nuevaImagenConAdj = { ...nuevaImagen };
        nuevaImagenConAdj.adjuntos = JSON.stringify(adjuntos);
        preLoaderOn(true);
        const resultadoOp = await guardarImagen(nuevaImagenConAdj, autorizacion)
        preLoaderOn(false);
        if (resultadoOp) { router.push("/galeria/galeria#principal") };
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
                    <FormGroup>
                        <Label>
                            URL de adjuntos (Instagram, etc.)
                        </Label>
                        {listaAdjuntos}
                        <Button className="mt-3 w-100" color="info" onClick={() => {
                            const adjuntosProvisorio = [...adjuntos];
                            adjuntosProvisorio.push("");
                            setAdjuntos(adjuntosProvisorio)
                        }}>Agregar nuevo adjunto</Button>
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar imagen</Button>
                    <Link href="/galeria/galeria#principal" passHref ><Button className="mt-3" color="primary" size="lg">Cancelar</Button></Link>
                </Form>
            </section>
        </>
    )
}