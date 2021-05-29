/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { preLoader, urlImgDestacada } from "../librerias/libreriaApp.jsx";
import Card from '../componentes/cardTaller.jsx';
import CardImagen from "../componentes/cardImagen.jsx";
import CardEvento from "../componentes/cardEvento.jsx";
import AltaDestacados from "../componentes/altaDestacados";
import { useSelector, useDispatch } from 'react-redux';
import { traerEventos } from "../librerias/libreriaEventos.jsx";
import { traerTalleres } from "../librerias/libreriaTalleres.jsx";
import { traerImagenes } from "../librerias/libreriaImagenes.jsx";
import { traerDestacados } from "../librerias/libreriaDestacados.jsx";
import Head from 'next/head';

export default function Home(props) {
  const [statePreLoader, preLoaderOn] = useState(true);
  const listadoImagenes = useSelector((estado) => estado.imagenes);
  const listadoDestacados = useSelector((estado) => estado.destacados);
  const listadoTalleres = useSelector((estado) => estado.talleres);
  const listadoEventos = useSelector((estado) => estado.eventos);
  const token = useSelector((estado) => estado.token);
  const dispatch = useDispatch();

  async function traerDatos() {
    preLoaderOn(true);
    const listados = await Promise.all([traerDestacados(), traerTalleres(), traerImagenes(), traerEventos()]);
    preLoaderOn(false);
    if (listados) {
      dispatch({ type: "GUARDAR_LISTADO", listado: listados[0], tipoListado: "destacados" });
      dispatch({ type: "GUARDAR_LISTADO", listado: listados[1], tipoListado: "talleres" });
      dispatch({ type: "GUARDAR_LISTADO", listado: listados[2], tipoListado: "imagenes" });
      dispatch({ type: "GUARDAR_LISTADO", listado: listados[3], tipoListado: "eventos" });
    }
  }

  useEffect(() => { traerDatos() }, []);

  let zonaAdmin;
  let zonaListado = [];
  if (listadoDestacados) {
    if (token && listadoTalleres && listadoEventos && listadoImagenes) {
      zonaAdmin = <AltaDestacados preLoaderOn={preLoaderOn} />
    }
    if (listadoDestacados.length > 0) {
      zonaListado =
        // eslint-disable-next-line array-callback-return            
        listadoDestacados.map((elemento, i) => {
          let listado;
          let TipoCard;
          switch (elemento.tipoListado) {
            case "Talleres":
              listado = listadoTalleres;
              TipoCard = Card;
              break;
            case "Imagenes":
              listado = listadoImagenes;
              TipoCard = CardImagen;
              break;
            case "Eventos":
              listado = listadoEventos;
              TipoCard = CardEvento;
              break;
            default: return "";
          }
          let objDestacado;
          if (listado) {
            objDestacado = listado.find(unDestacado => { return (unDestacado.id == elemento.id) });
            if (objDestacado) {
              return (<TipoCard {...props} datosCard={objDestacado} key={elemento.tipoListado + objDestacado.id} tipo="editarDestacados" i={i} tipoCard={elemento.tipoListado} />)
            }
          } else {
            return (<div className="card" key={i}></div>);
          }
        });
    } else {
      zonaListado = <div>Por el momento no hay entradas para mostrar</div>
    }
  }

  let zonaPreLoader;
  if (statePreLoader) { zonaPreLoader = preLoader };

  return (
    <>
      <Head>
        <meta property="og:title" content="Centro Cultural Casa Abierta" />
        <meta property="og:description" content="Centro Cultural Casa Abierta. Saavedra, C.A.B.A." />
        <meta property="og:image" content={urlImgDestacada} />
        <meta name="twitter:image" content={urlImgDestacada} />
      </Head>
      {zonaAdmin}
      {zonaPreLoader}
      <section id="listadoDestacados">
        {zonaListado}
      </section>
    </>
  )
}
