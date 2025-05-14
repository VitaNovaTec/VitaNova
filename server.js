import express from 'express';
import cors from 'cors';
import faunaRoutes from './routes/fauna.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/fauna', faunaRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
