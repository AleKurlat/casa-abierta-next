const jwt = require("jsonwebtoken");

export function auth(handler) {
    return async (req, res) => {
        if (req.method === 'GET') { return handler(req, res) }
        try {
            let token = req.headers["authorization"];
            if (!token) {
                throw new Error("Para realizar esta acción es necesario ingresar con un usuario");
            }

            token = token.replace("Bearer ", "");

            jwt.verify(token, "Secret", (err, user) => {
                if (err) {
                    throw new Error("Token invalido. Probar cerrando sesión y volviendo a loguearse");
                }
            });

            const base64Url = token.split('.')[1];
            const base64Decode = Buffer.from(base64Url, "base64");
            const datosToken = JSON.parse(base64Decode)
            return handler(req, res, datosToken);
        }
        catch (e) {
            res.status(403).send(e.message);
        }
    };
}