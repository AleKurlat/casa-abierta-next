import axios from "axios";
import { dominio, responderError } from "./libreriaApp.jsx";

let origen;
if (process.env.NODE_ENV === 'production') {
    origen = { headers: { "origin": "https://casaabierta.vercel.app" } }
} else {
    origen = { headers: { "origin": "http://localhost:3000" } }
}

export async function traerImagenes() {
    try {
        const url = dominio + "/galeria";
        const resp = await axios.get(url);
        if (resp && resp.status === 200) {
            return resp.data;
        }
    }

    catch (e) { return responderError(e) }
}

export async function borrarImagen(id, autorizacion) {
    try {
        const urlAPI = dominio + "/galeria/" + id;
        const borrar = await axios.delete(urlAPI, autorizacion);
        if (borrar && borrar.status === 200) {
            return true
        }
    }
    catch (e) { return responderError(e) }
}

export async function guardarImagen(nuevaImagen, autorizacion) {
    try {
        const url = dominio + "/galeria";
        const postear = await axios.post(url, nuevaImagen, autorizacion);
        if (postear && postear.status === 200) {
            return true;
        }
    }

    catch (e) { return responderError(e); }
}

export async function traerUnaImagen(id) {
    try {
        const url = dominio + "/galeria/" + id;
        const resp = await axios.get(url, origen);
        if (resp && resp.status === 200) {
            return resp.data;
        }
    }
    catch (e) { return responderError(e); }
}

export async function editarImagen(id, objEditado, autorizacion) {
    try {
        const url = dominio + "/galeria/" + id;
        const resp = await axios.put(url, objEditado, autorizacion);
        if (resp && resp.status === 200) {
            return true;
        }
    }
    catch (e) { return responderError(e); }
}