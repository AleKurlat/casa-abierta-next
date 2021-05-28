import axios from "axios";
import { dominio, responderError } from "./libreriaApp.jsx";

export async function traerDestacados() {
    try {
        const url = dominio + "/destacados";
        const resp = await axios.get(url);
        if (resp && resp.status === 200) {
            return resp.data;
        }
    }

    catch (e) { return responderError(e) }
}

export async function guardarDestacados(arrayDestacados, autorizacion) {
    try {
        const url = dominio + "/destacados/1";
        let traducido = JSON.stringify(arrayDestacados);
        let objSubir = { destacados: traducido }
        await axios.put(url, objSubir, autorizacion);
        return true;
    }

    catch (e) { return responderError(e) }
}