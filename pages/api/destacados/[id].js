const modelDestacados = require("../../../APIutil/models/modelDestacados");
import { auth } from "../../../APIutil/auth";

async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'PUT') {
        try {
            let respuesta = await modelDestacados.editarDestacados(req.body.destacados, id);
            if (respuesta == 0) {
                res.statusCode = 400;
                throw new Error("No se realizó ninguna modificación");
            } else {
                res.send("Los destacados se editaron correctamente")
            };
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}

export default auth(handler);