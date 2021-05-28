/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from '../../../componentes/cardTaller.jsx';
import { traerUnTaller } from "../../../librerias/libreriaTalleres.jsx";

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
            {zonaCard}
        </>
    )
}