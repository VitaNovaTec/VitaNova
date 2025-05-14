// faunaRoutes.js
import express from 'express';
import { registrarFauna } from '../controllers/faunaController.js';

const router = express.Router();

// Ruta para registrar fauna
router.post('/registrar', registrarFauna);

export default router;
