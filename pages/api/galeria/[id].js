const modelGaleria = require("../../../APIutil/models/modelGaleria");
import { auth } from "../../../APIutil/auth";

async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        try {
            let respuesta = await modelGaleria.traerUnaImagen(id);
            if (!respuesta) {
                res.statusCode = 404;
                throw new Error("No se encontró ninguna imagen con ese ID o bien está archivada");
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
            const { nombre, url, descripcion, adjuntos } = req.body;
            if (!nombre || !url || !descripcion) {
                res.statusCode = 400;
                throw new Error("Todos los campos deben contener información");
            }

            let respuesta = await modelGaleria.editarImagen(nombre, url, descripcion, id, adjuntos);

            if (respuesta == 0) {
                res.statusCode = 400;
                throw new Error("No se realizó ninguna modificación");
            } else {
                res.send("Imagen editada correctamente")
            };
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
    if (req.method === 'DELETE') {
        try {
            let respuesta = await modelGaleria.borrarImagen(id);

            if (respuesta == 0) {
                res.statusCode = 400;
                throw new Error("No se borró ninguna imagen");
            } else {
                res.send("Imagen eliminada correctamente")
            };
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}

export default auth(handler);