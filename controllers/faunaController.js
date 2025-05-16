import { db } from '../db.js';

// Listas de valores válidos para los enums según tu tabla
const validWeatherConditions = ['soleado', 'parcialmente_nublado', 'nublado', 'lluvioso', 'tormenta', 'niebla'];
const validSeasons = ['verano_seco', 'invierno_lluviosa'];
const validRecordTypes = ['fauna_transecto', 'fauna_punto_conteo', 'fauna_busqueda_libre', 'validacion_cobertura', 'parcela_veg'];

export const registrarFauna = async (req, res) => {
  try {
    const {
      id_usuario,
      tipo_ecosistema,
      observaciones,
      imagenes,
      ubicacion,
      weather_condition,
      season,
      record_type
    } = req.body;

    // Validación de campos obligatorios
    if (!id_usuario || !tipo_ecosistema || !observaciones || !imagenes || !ubicacion || !record_type) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    // Validar que 'imagenes' sea arreglo y máximo 5
    if (!Array.isArray(imagenes) || imagenes.length > 5) {
      return res.status(400).json({ error: 'Máximo 5 imágenes permitidas.' });
    }

    // Validar valores enums
    if (weather_condition && !validWeatherConditions.includes(weather_condition)) {
      return res.status(400).json({ error: `weather_condition inválido. Valores permitidos: ${validWeatherConditions.join(', ')}` });
    }

    if (season && !validSeasons.includes(season)) {
      return res.status(400).json({ error: `season inválido. Valores permitidos: ${validSeasons.join(', ')}` });
    }

    if (!validRecordTypes.includes(record_type)) {
      return res.status(400).json({ error: `record_type inválido. Valores permitidos: ${validRecordTypes.join(', ')}` });
    }

    // Insertar en la base de datos
    await db.execute(
      `INSERT INTO Reportes (
        id_usuario, tipo_ecosistema, observaciones,
        imagenes, ubicacion, weather_condition, season, record_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_usuario,
        tipo_ecosistema,
        observaciones,
        JSON.stringify(imagenes),
        ubicacion,
        weather_condition || null,
        season || null,
        record_type
      ]
    );

    res.status(201).json({ message: 'Reporte registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar reporte:', error);
    res.status(500).json({ error: 'Error al registrar el reporte' });
  }
};
