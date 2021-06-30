const modelAdmins = require("../../../../APIutil/models/modelAdmins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            if (!req.body.usuario || !req.body.clave) {
                res.statusCode = 400;
                throw new Error("No enviaste todos los datos necesarios");
            }

            //paso 1: busco el usuario en base de datos
            let respuesta = await modelAdmins.buscarUnAdminPorUsername(req.body.usuario)
            if (!respuesta) {
                res.statusCode = 404;
                throw new Error("Ha ingresado un usuario que no existe");
            }

            // Paso 2: verificar que clave ingresada coincida con la encriptada en base de datos

            const recuperarClaveEncriptada = respuesta.clave;
            if (!bcrypt.compareSync(req.body.clave, recuperarClaveEncriptada)) {
                res.statusCode = 400;
                throw new Error("Ha ingresado incorrectamente la clave");
            }

            // paso 3: sesion
            const tokenData = {
                usuario: respuesta.usuario,
                id: respuesta.id,
                rol: respuesta.rol
            } // equivale a pulsera de reconocimiento en festivales

            const token = jwt.sign(tokenData, "Secret", {
                expiresIn: 60 * 60 * 24 // expira en 24 hs
            })
            res.send({ token });
        }

        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}