const modelGaleria = require("../../../APIutil/models/modelGaleria");
import { auth } from "../../../APIutil/auth";

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let respuesta = await modelGaleria.traerImagenes();
      res.send(respuesta);
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }
  if (req.method === 'POST') {
    const { nombre, url, descripcion, adjuntos } = req.body;
    try {
      if (!nombre || !url || !descripcion) {
        res.statusCode = 400;
        throw new Error("Es necesario completar todos los campos");
      }
      let respuesta = await modelGaleria.postearImagen(nombre, url, descripcion, adjuntos);

      res.send(respuesta);
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }
}

export default auth(handler);