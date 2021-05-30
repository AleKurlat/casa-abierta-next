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
          <meta name="description" content="Centro Cultural Casa Abierta. Saavedra, C.A.B.A." />
          <link rel="icon" href="/favicon.png" />
          <meta property="og:site_name" content="Centro Cultural Casa Abierta" />
          <meta name="twitter:title" content="Centro Cultural Casa Abierta" />
          <meta name="twitter:description" content="Centro Cultural Casa Abierta. Saavedra, C.A.B.A." />
          <meta property="og:type" content="website" />
        </Head>
        <Component {...pageProps} />
      </Principal>
    </Provider>
  )
}

export default MyApp
