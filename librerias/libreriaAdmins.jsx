import axios from "axios";
import { dominio, responderError } from "./libreriaApp.jsx";

export async function login(objLogin) {
    try {
        const url = dominio + "/admins/login";
        const loguear = await axios.post(url, objLogin);
        if (loguear && loguear.status === 200) {
            return loguear.data.token;
        }
    }
    catch (e) { return responderError(e) }
}

export async function registrarAdmin(objRegistro, autorizacion) {
    try {
        const url = dominio + "/admins/registrar"
        const registrar = await axios.post(url, objRegistro, autorizacion);
        if (registrar && registrar.status === 200) {
            return true;
        }
    }
    catch (e) { return responderError(e) }
}