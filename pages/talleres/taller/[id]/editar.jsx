/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { preLoader } from "../../../../librerias/libreriaApp.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { editarTaller, traerTalleres, traerUnTaller } from "../../../../librerias/libreriaTalleres.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function EditarCard(props) {
    const [dataForm, setDataForm] = useState({ nombre: "", descripcion: "", talleristas: "", horarios: "", imagen_url: "" });
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    async function recuperarDatosTaller() {
        preLoaderOn(true);
        const datosCard = await traerUnTaller(id);
        preLoaderOn(false);
        if (datosCard) { setDataForm(datosCard); }
    }

    useEffect(() => {
        if (!router.isReady) return;
        recuperarDatosTaller();
    }, [router.isReady]);

    function handler(e) {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    }

    async function guardarCambios(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const resultadoOp = await editarTaller(id, dataForm, autorizacion);
        preLoaderOn(false);
        if (resultadoOp) {
            preLoaderOn(true);
            const listado = await traerTalleres();
            preLoaderOn(false);
            if (listado) {
                dispatch({ type: "GUARDAR_LISTADO", listado: listado, tipoListado: "talleres" });
                volverAtras();
            }
        }
    }

    function volverAtras() {
        router.push("/talleres/talleres#principal");
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <h2>Editar taller</h2>
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
                        <Label>Talleristas</Label>
                        <Input className="my-3" type="textarea" name="talleristas" value={dataForm.talleristas} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Horarios</Label>
                        <Input className="my-3" type="textarea" name="horarios" value={dataForm.horarios} onChange={handler} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>URL de imagen</Label>
                        <Input className="my-3" type="textarea" name="imagen_url" value={dataForm.imagen_url} onChange={handler} required />
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar cambios</Button>
                    <Button className="mt-3" color="primary" size="lg" onClick={volverAtras}>Cancelar</Button>
                </Form>
            </section>
        </>
    )
}