//model Admins app server Casa Abierta

import { pool } from "../conexionPG";

export async function registrarAdmin(usuario, clave, rol) {
    let respuesta = await client.query(
        "INSERT INTO admins (usuario, clave, rol) VALUES ($1, $2, $3) RETURNING *",
        [usuario, clave, rol]);
    if (respuesta.rows[0]) {
        return respuesta.rows[0];
    } else
        return false;
}
export async function buscarUnAdminPorUsername(usuario) {
    let respuesta = await client.query(
        "SELECT * from admins WHERE usuario= $1",
        [usuario]);
    if (respuesta.rows[0]) { return respuesta.rows[0]; } else
        return false;
}
