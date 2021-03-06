import swal from 'sweetalert';

export const dominio = process.env.NEXT_PUBLIC_API_URL;

export const preLoader =
    <div className="preLoader"><img src="/loading.svg" alt="esperando" style={{ "marginLeft": "auto", "marginRight": "auto" }}></img></div>;

export function responderError(e) {
    if (e.response) {
        if (e.response.status === 403) {
            swal("No tiene permiso para realizar esta acción, o la sesión almacenada caducó. Iniciar nueva sesión");
            return 403;
        } else {
            if (e.response.data.Error) {
                swal(e.response.data.Error);
                return false;
            } else {
                swal("Status: " + e.response.status + " (" + e.response.statusText + ")");
                return false;
            }
        }
    } else {
        swal("Error en la solicitud al servidor");
        return false;
    }
}

export function extracto(descripcion) {
    const parte = descripcion.substring(0, 50);
    return (parte + " (...)");
}

export const urlImgDestacada = "https://i.ibb.co/cCyqjW7/logo-casa-abierta.png";