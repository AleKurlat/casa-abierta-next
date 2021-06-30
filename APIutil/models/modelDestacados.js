import { pool } from "../conexionPG";

export async function editarDestacados(destacados, id) {
    let respuesta = await pool.query(
        "UPDATE destacados SET destacados = $1 WHERE id = $2",
        [destacados, id]);
    return respuesta.rowCount;
}
export async function traerDestacados() {
    let respuesta = await pool.query(
        "SELECT destacados from destacados",
        []);
    return respuesta.rows[0].destacados;
}