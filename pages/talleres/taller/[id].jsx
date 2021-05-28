/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from '../../../componentes/cardTaller.jsx';
import { traerUnTaller } from "../../../librerias/libreriaTalleres.jsx";
import Head from 'next/head';

export async function getServerSideProps(context) {
    const id = context.params.id;
    const datosCard = await traerUnTaller(id);

    if (!datosCard) {
        return {
            notFound: true,
        }
    }

    return {
        props: { datosCard }, // will be passed to the page component as props
    }
}

export default function UnTaller({ datosCard }) {

    let zonaCard;
    if (datosCard) {
        zonaCard = <section id={"unaCard"}>
            <Card datosCard={datosCard} tipo="unaCard" />
        </section>
    }

    return (
        <>
            <Head>
                <title>{datosCard.nombre + " en Casa Abierta"}</title>
                <meta name="description" content={datosCard.descripcion} />
                <meta property="og:title" content={datosCard.nombre + " en Casa Abierta"} />
                <meta property="og:description" content={datosCard.descripcion} />
                <meta property="og:image" content={datosCard.imagen_url} />
                <meta name="twitter:title" content={datosCard.nombre + " en Casa Abierta"} />
                <meta name="twitter:description" content={datosCard.descripcion} />
                <meta name="twitter:image" content={datosCard.imagen_url} />
            </Head>
            {zonaCard}
        </>
    )
}