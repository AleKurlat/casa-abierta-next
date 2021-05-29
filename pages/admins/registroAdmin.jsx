import React, { useState } from 'react';
import { preLoader } from "../librerias/libreriaApp.jsx";
import { useSelector } from 'react-redux';
import { registrarAdmin } from "../librerias/libreriaAdmins.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function Registro(props) {

    const userVacio = {
        usuario: "",
        clave: "",
        email: "",
    }
    const [objRegistro, setObjRegistro] = useState(userVacio);
    const [statePreLoader, preLoaderOn] = useState(false);
    const token = useSelector((estado) => estado.token);
    const autorizacion = { headers: { Authorization: token } };

    function cambiarValorInput(e) {
        setObjRegistro({ ...objRegistro, [e.target.name]: e.target.value });
    };

    async function guardarForm(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const resultadoOp = await registrarAdmin(objRegistro, autorizacion);
        preLoaderOn(false);
        if (resultadoOp && resultadoOp !== 403) {
            alert("Usuario guardado correctamente");
            props.history.push("/");
        }
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <h2>Registrar administrador</h2>
            <Form className="card2 align-items-stretch text-start" onSubmit={guardarForm}>
                {zonaPreLoader}
                <FormGroup>
                    <Label>Usuario</Label>
                    <Input className="my-3" type="text" onChange={cambiarValorInput} value={objRegistro.usuario} name="usuario" required />
                </FormGroup>
                <FormGroup>
                    <Label>Contraseña</Label>
                    <Input className="my-3" type="password" onChange={cambiarValorInput} value={objRegistro.clave} name="clave" required />
                </FormGroup>
                <Button type="submit" className="mt-3" color="primary" size="lg">Guardar admin</Button>
            </Form>
        </>
    )
}