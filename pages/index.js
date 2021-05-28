import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { urlImgDestacada } from "../librerias/libreriaApp.jsx";

export default function Home() {

  return (
    <div >
      <Head>
        <meta property="og:title" content="Centro Cultural Casa Abierta" />
        <meta property="og:description" content="Centro Cultural Casa Abierta. Saavedra, C.A.B.A." />
        <meta property="og:image" content={urlImgDestacada} />
        <meta name="twitter:image" content={urlImgDestacada} />
      </Head>

      Hola
    </div>
  )
}
