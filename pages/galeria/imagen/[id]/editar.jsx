/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { preLoader } from "../../../../librerias/libreriaApp.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { editarImagen, traerImagenes, traerUnaImagen } from "../../../../librerias/libreriaImagenes.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function EditarCard(props) {
    const [dataForm, setDataForm] = useState({
        nombre: "",
        url: "",
        descripcion: "",
    });
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    async function recuperarDatosImagen() {
        preLoaderOn(true);
        const datosCard = await traerUnaImagen(id);
        preLoaderOn(false);
        if (datosCard) { setDataForm(datosCard); }
    }

    useEffect(() => {
        if (!router.isReady) return;
        recuperarDatosImagen();
    }, [router.isReady]);

    function handler(e) {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    }

    async function guardarCambios(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const resultadoOp = await editarImagen(id, dataForm, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) {
            preLoaderOn(true);
            const listado = await traerImagenes();
            preLoaderOn(false);
            if (listado) {
                dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "imagenes" });
                volverAtras();
            }
        }
    }

    function volverAtras() {
        router.push("/galeria/galeria");
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <h2>Editar imagen</h2>
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
                        <Input className="my-3" type="textarea" name="url" value={dataForm.url} onChange={handler} required />
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar cambios</Button>
                    <Button className="mt-3" color="primary" size="lg" onClick={volverAtras}>Cancelar</Button>
                </Form>
            </section>
        </>
    )
}