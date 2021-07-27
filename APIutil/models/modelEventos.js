//model Eventos app server Casa Abierta

import { pool } from "../conexionPG";

export async function postearEvento(nombre, descripcion, imagen_url, fecha, adjuntos) {
    let respuesta = await pool.query(
        "INSERT INTO eventos (nombre, descripcion, imagen_url, fecha, adjuntos) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [nombre, descripcion, imagen_url, fecha, adjuntos]);
    return respuesta.rows;
}
export async function traerEventos() {
    let respuesta = await pool.query(
        "SELECT * from eventos WHERE archivado is NULL ORDER BY id",
        []);
    return respuesta.rows;
}
export async function traerUnEvento(id) {
    let respuesta = await pool.query(
        "SELECT * from eventos WHERE id = $1 AND archivado is NULL",
        [id]);
    return respuesta.rows[0];
}
export async function editarEvento(nombre, descripcion, imagen_url, fecha, id) {
    let respuesta = await pool.query(
        "UPDATE eventos SET nombre = $1, descripcion = $2, imagen_url = $3, fecha = $4 WHERE id = $5",
        [nombre, descripcion, imagen_url, fecha, id]);
    return respuesta.rowCount;
}
export async function borrarEvento(id) {
    let respuesta = await pool.query(
        "UPDATE eventos SET archivado = $1 WHERE id = $2",
        [1, id]);
    return respuesta.rowCount;
}