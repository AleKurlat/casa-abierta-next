import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import "../styles/App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Principal from "../componentes/principal";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Principal>
        <Head>
          <title>Centro Cultural Casa Abierta</title>
          <meta name="description" content="Sitio web del Centro Cultural Casa Abierta - Saavedra, C.A.B.A." />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </Principal>
    </Provider>
  )
}

export default MyApp
