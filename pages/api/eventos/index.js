const modelEventos = require("../../../APIutil/models/modelEventos");

export default async (req, res) => {
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
}