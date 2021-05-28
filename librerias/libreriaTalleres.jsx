import axios from "axios";
import { dominio, responderError } from "./libreriaApp.jsx";

export async function traerTalleres() {
    try {
        const url = dominio + "/talleres";
        const resp = await axios.get(url);
        if (resp && resp.status === 200) {
            return resp.data;
        }
    }

    catch (e) { return responderError(e) }
}

export async function borrarTaller(id, autorizacion) {
    try {
        const urlAPI = dominio + "/talleres/" + id;
        const borrar = await axios.delete(urlAPI, autorizacion);
        if (borrar && borrar.status === 200) {
            return true;
        }
    }
    catch (e) { return responderError(e) }
}

export async function guardarTaller(nuevoTaller, autorizacion) {
    try {
        const url = dominio + "/talleres";
        const postear = await axios.post(url, nuevoTaller, autorizacion);
        if (postear && postear.status === 200) {
            return true;
        }
    }

    catch (e) { return responderError(e); }
}

export async function traerUnTaller(id) {
    try {
        const url = dominio + "/talleres/" + id;
        const resp = await axios.get(url);
        if (resp && resp.status === 200) {
            return resp.data;
        }
    }
    catch (e) { return responderError(e); }
}

export async function editarTaller(id, objEditado, autorizacion) {
    try {
        const url = dominio + "/talleres/" + id;
        const resp = await axios.put(url, objEditado, autorizacion);
        if (resp && resp.status === 200) {
            return true;
        }
    }
    catch (e) { return responderError(e); }
}