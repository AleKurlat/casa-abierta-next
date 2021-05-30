import Contacto from '../componentes/contacto.jsx';

export default function Descripcion(props) {
    return (
        <div className="card2 cardGrande">
            <h2 className="tituloCardGrande">Centro Cultural Casa Abierta</h2>
            <h4 className="">Saavedra, C.A.B.A.</h4>
            <div className="my-2">Un espacio de encuentro. Un lugar para compartir palabras, músicas, miradas. Una casa que abraza para formar redes. Un rincón en el barrio.</div>
            <Contacto />
            <img className="my-2" src="https://i.ibb.co/cNyzhy4/logo-Casa-Abierta.jpg" alt="Logo de Casa Abierta" />
        </div>
    )
}