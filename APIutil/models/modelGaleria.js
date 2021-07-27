//model Galeria app server Casa Abierta

import { pool } from "../conexionPG";

export async function postearImagen(nombre, url, descripcion, adjuntos) {
    let respuesta = await pool.query(
        "INSERT INTO galeria (nombre, url, descripcion, adjuntos) VALUES ($1, $2, $3, $4) RETURNING *",
        [nombre, url, descripcion, adjuntos]);
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
export async function editarImagen(nombre, url, descripcion, id, adjuntos) {
    let respuesta = await pool.query(
        "UPDATE galeria SET nombre = $1, url = $2, descripcion = $3, adjuntos = $5 WHERE id = $4",
        [nombre, url, descripcion, id, adjuntos]);
    return respuesta.rowCount;
}
export async function borrarImagen(id) {
    let respuesta = await pool.query(
        "UPDATE galeria SET archivado = $1 WHERE id = $2",
        [1, id]);
    return respuesta.rowCount;
}