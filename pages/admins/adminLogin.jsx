import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { preLoader } from "../../librerias/libreriaApp.jsx";
import { login } from "../../librerias/libreriaAdmins.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminLogin(props) {

    const dispatch = useDispatch();
    const [objLogin, setObjLogin] = useState({
        usuario: "",
        clave: ""
    });
    const [statePreLoader, preLoaderOn] = useState(false);
    const router = useRouter();

    function cambiarValorInput(e) {
        setObjLogin({ ...objLogin, [e.target.name]: e.target.value });
    };

    async function guardarForm(e) {
        e.preventDefault();
        preLoaderOn(true);
        const token = await login(objLogin);
        preLoaderOn(false);
        if (token) {
            dispatch({ type: 'GUARDAR_TOKEN', token: token });
            router.push("/");
        }
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <>
            <h2>Ingresar usuario y clave</h2>
            <Form className="card2 align-items-stretch text-start" onSubmit={guardarForm}>
                {zonaPreLoader}
                <FormGroup>
                    <Label>Usuario</Label>
                    <Input className="my-3" type="text" onChange={cambiarValorInput} value={objLogin.usuario} name="usuario" required />
                </FormGroup>
                <FormGroup>
                    <Label>Contraseña</Label>
                    <Input className="my-3" type="password" onChange={cambiarValorInput} value={objLogin.clave} name="clave" required />
                </FormGroup>
                <Button type="submit" className="mt-3" color="primary" size="lg">Ingresar</Button>
                <Link href="/#menuNav" passHref ><Button className="mt-3" color="primary" size="lg">Volver al inicio</Button></Link>
            </Form>
        </>
    )
}