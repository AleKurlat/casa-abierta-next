import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavLink, Button } from 'reactstrap';
import { Link as RRNavLink } from 'next/link';
import React, { useState, useEffect } from "react";

export default function Principal(props) {
    const usuario = useSelector((estado) => estado.usuario);
    const dispatch = useDispatch();
    const [zonaAdmin, setZonaAdmin] = useState();

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

                <Nav pills className="nav nav-fill w-100">
                    <NavLink tag={RRNavLink} className="p-2 flex-grow-1" href="/" exact="true">Inicio</NavLink>
                    <NavLink tag={RRNavLink} className="p-2 flex-grow-1" href="/talleres/talleres">Talleres</NavLink>
                    <NavLink tag={RRNavLink} className="p-2 flex-grow-1" href="/eventos/eventos">Eventos</NavLink>
                    <NavLink tag={RRNavLink} className="p-2 flex-grow-1" href="/galeria/galeria">Galería</NavLink>
                    <NavLink tag={RRNavLink} className="p-2 flex-grow-1" href="/nosotrxs">Nosotrxs</NavLink>
                    <NavLink href="https://www.instagram.com/saavedracasaabierta/" className="align-self-center" target="_blank" rel="noopener noreferrer"><img className="me-1" src="/ig50.png" alt="social media" style={{ width: "30px" }} />Instagram</NavLink>
                </Nav>
            </header>

            <main id="principal">
                {props.children}
            </main>
            <footer>
                <Button className="my-2" color="primary" tag={RRNavLink} href="/admins/adminLogin">Ingresar</Button>
                <div >
                    <h5 style={{ color: "#cf4444" }}>Centro Cultural Casa Abierta</h5>
                    <h6>Saavedra, C.A.B.A.</h6>
                </div>
                <a href="mailto:casabiertasaavedra@gmail.com" style={{ textDecoration: "none" }}>casabiertasaavedra@gmail.com</a>
                <div><a href="https://github.com/AleKurlat" style={{ textDecoration: "none" }}>Sitio web programado en React.JS y Node.JS</a></div>
            </footer>
        </div>
    )
}