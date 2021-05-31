import Contacto from '../componentes/contacto.jsx';
import { Button } from 'reactstrap';
import Link from 'next/link';

export default function Descripcion(props) {
    return (
        <div className="card2 cardGrande">
            <div className="textoCardGrande">
                <h2 className="tituloCardGrande">Centro Cultural Casa Abierta</h2>
                <h4 className="text-center">Saavedra, C.A.B.A.</h4>
                <div className="my-2">Un espacio de encuentro. Un lugar para compartir palabras, músicas, miradas. Una casa que abraza para formar redes. Un rincón en el barrio.</div>
                <Contacto />
            </div>
            <div className="contenedorImagenGrande"><img src="https://i.ibb.co/cNyzhy4/logo-Casa-Abierta.jpg" alt="Logo de Casa Abierta" /></div>
            <Link href="/#principal" ><Button className="flex-grow-1 w-100" color="primary">Volver a inicio</Button></Link>
        </div>
    )
}