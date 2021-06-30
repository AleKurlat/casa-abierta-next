const modelAdmins = require("../../../../APIutil/models/modelAdmins");
const bcrypt = require("bcrypt");
import { auth } from "../../../../APIutil/auth";

async function handler(req, res, datosToken) {
    if (req.method === 'POST') {
        try {
            if (datosToken.rol != 1) {
                res.statusCode = 403;
                throw new Error("Solo los super-administradores pueden registrar nuevos admins");
            }

            if (!req.body.usuario || !req.body.clave) {
                res.statusCode = 400;
                throw new Error("No enviaste todos los datos necesarios");
            }

            //valido que el usuario no esté ya en la base de datos
            let respuesta = await modelAdmins.buscarUnAdminPorUsername(req.body.usuario);
            if (respuesta) {
                res.statusCode = 400;
                throw new Error("Ya existe un usuario con ese nombre");
            }

            // si esta todo bien, encripto la clave
            const claveEncriptada = await bcrypt.hash(req.body.clave, 10); // es asincronica asi que hay que agregarle siempre async al POST

            // Guardo el nuevo registro con la clave encriptada y le muestro al usuario los otros datos
            respuesta = await modelAdmins.registrarAdmin(req.body.usuario, claveEncriptada, 2);
            if (respuesta) {
                delete respuesta.clave;
                res.send(respuesta);
            } else res.send("No fue posible registrar al Admin");
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}

export default auth(handler);