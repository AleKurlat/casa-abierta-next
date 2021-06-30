const modelEventos = require("../../../APIutil/models/modelEventos");

export default async (req, res) => {
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
}