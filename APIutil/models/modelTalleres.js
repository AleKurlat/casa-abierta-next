//model Talleres app server Casa Abierta
import { pool } from "../conexionPG";

export async function postearTaller(nombre, descripcion, talleristas, horarios, imagen_url, adjuntos) {
    const client = await pool.connect();
    let respuesta = await client.query(
        "INSERT INTO talleres (nombre, descripcion, talleristas, horarios, imagen_url, adjuntos) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [nombre, descripcion, talleristas, horarios, imagen_url, adjuntos]);
    client.release();
    return respuesta.rows;
}
export async function traerTalleres() {
    const client = await pool.connect();
    let respuesta = await client.query(
        "SELECT * from talleres WHERE archivado is NULL ORDER BY id",
        []);
    client.release();
    return respuesta.rows;
}
export async function traerUnTaller(id) {
    const client = await pool.connect();
    let respuesta = await client.query(
        "SELECT * from talleres WHERE id = $1 AND archivado is NULL",
        [id]);
    client.release();
    return respuesta.rows[0];
}
export async function editarTaller(id, nombre, descripcion, talleristas, horarios, imagen_url, adjuntos) {
    const client = await pool.connect();
    let respuesta = await client.query(
        "UPDATE talleres SET nombre = $2, descripcion = $3, talleristas = $4, horarios = $5, imagen_url=$6, adjuntos =$7 WHERE id = $1",
        [id, nombre, descripcion, talleristas, horarios, imagen_url, adjuntos]);
    client.release();
    return respuesta.rowCount;
}
export async function borrarTaller(id) {
    const client = await pool.connect();
    let respuesta = await client.query(
        "UPDATE talleres SET archivado = $1 WHERE id = $2",
        [1, id]);
    client.release();
    return respuesta.rowCount;
}