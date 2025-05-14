import { db } from '../db.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM Usuarios WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(contraseña, user.contraseña);

    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al autenticar usuario' });
  }
};
