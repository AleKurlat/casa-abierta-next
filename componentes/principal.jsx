import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavLink, Button } from 'reactstrap';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Principal(props) {
    const usuario = useSelector((estado) => estado.usuario);
    const dispatch = useDispatch();
    const [zonaAdmin, setZonaAdmin] = useState();
    const router = useRouter();

    function desloguear() {
        dispatch({ type: 'GUARDAR_TOKEN', token: "" });
        setZonaAdmin();
    }

    useEffect(() => {
        if (usuario.usuario) {
            let barraAdmin =
                <div className="zonaAdmin">
                    <h5 className="info">Bienvenidx {usuario.usuario}</h5>
                    <Button className="boton" color="primary" onClick={desloguear}>Cerrar sesión</Button>
                </div>
            setZonaAdmin(barraAdmin);
        }
    }, [usuario]);

    return (
        <div id="contenedor">
            <header id="encabezado">
                {zonaAdmin}
                <div className="cartel my-3">
                    <div><img src="/logo2bis.svg" alt="logo" style={{ "marginLeft": "auto", "marginRight": "auto" }}></img></div>
                    <div><img src="/logo3.svg" alt="logo" style={{ "marginLeft": "auto", "marginRight": "auto" }}></img></div>
                </div>

                <Nav pills className="nav nav-fill w-100" id="menuNav">
                    <Link href="/" passHref scroll={false}><NavLink className={"p-2 flex-grow-1 " + (router.pathname == "/" ? "active" : "")} exact="true">Inicio</NavLink></Link>
                    <Link href="/talleres/talleres" passHref scroll={false}><NavLink className={"p-2 flex-grow-1 " + (router.pathname == "/talleres/talleres" ? "active" : "")} >Talleres</NavLink></Link>
                    <Link href="/eventos/eventos" passHref scroll={false}><NavLink className={"p-2 flex-grow-1 " + (router.pathname == "/eventos/eventos" ? "active" : "")} >Eventos</NavLink></Link>
                    <Link href="/galeria/galeria" passHref scroll={false}><NavLink className={"p-2 flex-grow-1 " + (router.pathname == "/galeria/galeria" ? "active" : "")} >Galería</NavLink></Link>
                    <Link href="/nosotrxs" passHref scroll={false}><NavLink className={"p-2 flex-grow-1 " + (router.pathname == "/nosotrxs" ? "active" : "")} >Nosotrxs</NavLink></Link>
                    <Link href="https://www.instagram.com/saavedracasaabierta/" passHref scroll={false}><NavLink className="align-self-center" target="_blank" rel="noopener noreferrer"><img className="me-1" src="/ig50.png" alt="social media" style={{ width: "30px" }} />Instagram</NavLink></Link>
                </Nav>
            </header>

            <main id="principal">
                {props.children}
            </main>
            <footer>
                <Link href="/admins/adminLogin#menuNav" passHref scroll={false}><Button className="my-2" color="primary" >Ingresar</Button></Link>
                <div >
                    <h5 style={{ color: "#cf4444" }}>Centro Cultural Casa Abierta</h5>
                    <h6>Saavedra, C.A.B.A.</h6>
                </div>
                <a href="mailto:casabiertasaavedra@gmail.com" style={{ textDecoration: "none" }}>casabiertasaavedra@gmail.com</a>
                <div><a href="https://github.com/AleKurlat" style={{ textDecoration: "none" }}>Sitio web programado en React / Next.js y Node.js</a></div>
            </footer>
        </div>
    )
}