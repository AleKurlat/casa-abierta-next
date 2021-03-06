import axios from "axios";
import { dominio, responderError } from "./libreriaApp.jsx";

export async function traerEventos() {
    try {
        const url = dominio + "/eventos";
        const resp = await axios.get(url);
        if (resp && resp.status === 200) {
            return resp.data;
        }
    }

    catch (e) { return responderError(e) }
}

export async function borrarEvento(id, autorizacion) {
    try {
        const urlAPI = dominio + "/eventos/" + id;
        const borrar = await axios.delete(urlAPI, autorizacion);
        if (borrar && borrar.status === 200) {
            return true;
        }
    }
    catch (e) { return responderError(e) }
}

export async function guardarEvento(nuevoEvento, autorizacion) {
    try {
        const url = dominio + "/eventos";
        const copiaEvento = { ...nuevoEvento };
        copiaEvento.fecha = new Date(copiaEvento.fecha);
        const postear = await axios.post(url, copiaEvento, autorizacion);
        if (postear && postear.status === 200) {
            return true;
        }
    }

    catch (e) { return responderError(e); }
}

export async function traerUnEvento(id, origen) {
    try {
        const url = dominio + "/eventos/" + id;
        const resp = await axios.get(url, origen);
        if (resp && resp.status === 200) {
            return resp.data;
        }
    }
    catch (e) { return responderError(e); }
}

export async function editarEvento(id, objEditado, autorizacion) {
    try {
        const url = dominio + "/eventos/" + id;
        const copiaEvento = { ...objEditado };
        copiaEvento.fecha = new Date(copiaEvento.fecha);
        const resp = await axios.put(url, copiaEvento, autorizacion);
        if (resp && resp.status === 200) {
            return true;
        }
    }
    catch (e) { return responderError(e); }
}