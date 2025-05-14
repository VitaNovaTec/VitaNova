import bcrypt from 'bcryptjs';

async function generatePassword() {
  const password = 'tuContraseña123';  // Contraseña que vas a usar
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);  // Te muestra la contraseña encriptada en la terminal
}

generatePassword();
