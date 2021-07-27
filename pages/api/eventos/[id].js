const modelEventos = require("../../../APIutil/models/modelEventos");
import { auth } from "../../../APIutil/auth";

async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        try {
            let respuesta = await modelEventos.traerUnEvento(id);
            if (!respuesta) {
                res.statusCode = 404;
                throw new Error("No se encontró ningún evento con ese ID o bien está archivado");
            }
            res.send(respuesta);
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
    if (req.method === 'PUT') {
        try {
            const { nombre, descripcion, imagen_url, fecha, adjuntos } = req.body
            if (!nombre || !descripcion || !imagen_url || !fecha) {
                res.statusCode = 400;
                throw new Error("Todos los campos deben contener información");
            }
            let respuesta = await modelEventos.editarEvento(nombre, descripcion, imagen_url, fecha, id, adjuntos);
            if (respuesta == 0) {
                res.statusCode = 400;
                throw new Error("No se realizó ninguna modificación");
            } else {
                res.send("Evento editado correctamente")
            };
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
    if (req.method === 'DELETE') {
        try {
            let respuesta = await modelEventos.borrarEvento(id);

            if (respuesta == 0) {
                res.statusCode = 400;
                throw new Error("No se borró ningún evento");
            } else {
                res.send("Evento eliminado correctamente")
            };
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}

export default auth(handler);