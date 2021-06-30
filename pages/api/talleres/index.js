const modelTalleres = require("../../../APIutil/models/modelTalleres");
import { auth } from "../../../APIutil/auth";

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let respuesta = await modelTalleres.traerTalleres();
      res.send(respuesta);
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      if (!req.body.nombre || !req.body.descripcion || !req.body.talleristas || !req.body.horarios || !req.body.imagen_url) {
        res.statusCode = 400;
        throw new Error("Es necesario completar todos los campos");
      }
      let respuesta = await modelTalleres.postearTaller(req.body.nombre, req.body.descripcion, req.body.talleristas, req.body.horarios, req.body.imagen_url);

      res.send(respuesta);
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }

}

export default auth(handler);