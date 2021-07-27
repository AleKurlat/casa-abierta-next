/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { preLoader } from "../../../../librerias/libreriaApp.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { editarTaller, traerTalleres, traerUnTaller } from "../../../../librerias/libreriaTalleres.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function EditarCard(props) {
    const [dataForm, setDataForm] = useState({ nombre: "", descripcion: "", talleristas: "", horarios: "", imagen_url: "" });
    const [adjuntos, setAdjuntos] = useState([]);
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
        if (datosCard) {
            setDataForm(datosCard);
            if (datosCard.adjuntos && datosCard.adjuntos.length > 0) { setAdjuntos(datosCard.adjuntos) }
        }
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
        const tallerEditado = { ...dataForm }
        tallerEditado.adjuntos = JSON.stringify(adjuntos);
        preLoaderOn(true);
        const resultadoOp = await editarTaller(id, tallerEditado, autorizacion);
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

    function handlerAdjunto(e, i) {
        const adjuntosProvisorio = [...adjuntos]
        adjuntosProvisorio[i] = e.target.value;
        setAdjuntos(adjuntosProvisorio);
    };

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
                    <Button type="submit" className="mt-3" color="primary" size="lg">Guardar cambios</Button>
                    <Button className="mt-3" color="primary" size="lg" onClick={volverAtras}>Cancelar</Button>
                </Form>
            </section>
        </>
    )
}