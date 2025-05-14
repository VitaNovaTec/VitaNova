// faunaController.js
import { db } from '../db.js';

export const registrarFauna = async (req, res) => {
  try {
    const {
      id_usuario,
      tipo_ecosistema,
      observaciones,
      imagen_url,
      ubicacion,
    } = req.body;

    // Validación básica
    if (!id_usuario || !tipo_ecosistema || !observaciones || !imagen_url || !ubicacion) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Consulta para insertar datos en la base de datos
    await db.execute(
      `INSERT INTO Reportes (id_usuario, tipo_ecosistema, observaciones, imagen_url, ubicacion)
       VALUES (?, ?, ?, ?, ?)`,
      [id_usuario, tipo_ecosistema, observaciones, imagen_url, ubicacion]
    );

    // Respuesta de éxito
    res.status(201).json({ message: 'Reporte registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el reporte' });
  }
};
