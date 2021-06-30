const modelGaleria = require("../../../APIutil/models/modelGaleria");

export default async (req, res) => {
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
}