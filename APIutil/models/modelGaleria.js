//model Galeria app server Casa Abierta

import { pool } from "../conexionPG";

export async function postearImagen(nombre, url, descripcion) {
    let respuesta = await pool.query(
        "INSERT INTO galeria (nombre, url, descripcion) VALUES ($1, $2, $3) RETURNING *",
        [nombre, url, descripcion]);
    return respuesta.rows;
}
export async function traerImagenes() {
    let respuesta = await pool.query(
        "SELECT * from galeria WHERE archivado is NULL ORDER BY id",
        []);
    return respuesta.rows;
}
export async function traerUnaImagen(id) {
    let respuesta = await pool.query(
        "SELECT * from galeria WHERE id = $1 AND archivado is NULL",
        [id]);
    return respuesta.rows[0];
}
export async function editarImagen(nombre, url, descripcion, id) {
    let respuesta = await pool.query(
        "UPDATE galeria SET nombre = $1, url = $2, descripcion = $3 WHERE id = $4",
        [nombre, url, descripcion, id]);
    return respuesta.rowCount;
}
export async function borrarImagen(id) {
    let respuesta = await pool.query(
        "UPDATE galeria SET archivado = $1 WHERE id = $2",
        [1, id]);
    return respuesta.rowCount;
}