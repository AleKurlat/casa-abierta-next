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
export async function editarTaller(nombre, descripcion, talleristas, horarios, imagen_url, id) {
    const client = await pool.connect();
    let respuesta = await client.query(
        "UPDATE talleres SET nombre = $1, descripcion = $2, talleristas = $3, horarios = $4, imagen_url=$5 WHERE id = $6",
        [nombre, descripcion, talleristas, horarios, imagen_url, id]);
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