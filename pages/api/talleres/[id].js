const modelTalleres = require("../../../APIutil/models/modelTalleres");
import { auth } from "../../../APIutil/auth";

async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        try {
            let respuesta = await modelTalleres.traerUnTaller(id);
            if (!respuesta) {
                res.statusCode = 404;
                throw new Error("No se encontró ningún posteo con ese ID o bien está archivado");
            }
            res.send(respuesta);
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }

    if (req.method === 'PUT') {
        const { nombre, descripcion, talleristas, horarios, imagen_url, adjuntos } = req.body;
        try {
            if (!nombre || !descripcion || !talleristas || !horarios || !imagen_url) {
                res.statusCode = 400;
                throw new Error("Todos los campos deben contener información");
            }

            let respuesta = await modelTalleres.editarTaller(id, nombre, descripcion, talleristas, horarios, imagen_url, adjuntos);

            if (respuesta == 0) {
                res.statusCode = 400;
                throw new Error("No se realizó ninguna modificación");
            } else {
                res.send("Post editado correctamente")
            };
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
    if (req.method === 'DELETE') {
        try {
            let respuesta = await modelTalleres.borrarTaller(id);

            if (respuesta == 0) {
                res.statusCode = 400;
                throw new Error("No se borró ningún post");
            } else {
                res.send("Post eliminado correctamente")
            };
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}

export default auth(handler);