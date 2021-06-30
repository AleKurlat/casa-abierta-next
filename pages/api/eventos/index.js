const modelEventos = require("../../../APIutil/models/modelEventos");
import { auth } from "../../../APIutil/auth";

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let respuesta = await modelEventos.traerEventos();
      res.send(respuesta);
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }
  if (req.method === 'POST') {
    try {
      if (!req.body.nombre || !req.body.descripcion || !req.body.imagen_url || !req.body.fecha) {
        res.statusCode = 400;
        throw new Error("Es necesario completar todos los campos");
      }
      let respuesta = await modelEventos.postearEvento(req.body.nombre, req.body.descripcion, req.body.imagen_url, req.body.fecha);

      res.send(respuesta);
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }
}

export default auth(handler);