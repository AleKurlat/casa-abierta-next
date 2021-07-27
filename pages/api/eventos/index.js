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
      const { nombre, descripcion, imagen_url, fecha, adjuntos } = req.body;
      if (!nombre || !descripcion || !imagen_url || !fecha) {
        res.statusCode = 400;
        throw new Error("Es necesario completar todos los campos");
      }
      let respuesta = await modelEventos.postearEvento(nombre, descripcion, imagen_url, fecha, adjuntos);

      res.send(respuesta);
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }
}

export default auth(handler);