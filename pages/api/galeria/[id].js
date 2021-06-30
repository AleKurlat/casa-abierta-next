const modelGaleria = require("../../../APIutil/models/modelGaleria");

export default async (req, res) => {
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
}