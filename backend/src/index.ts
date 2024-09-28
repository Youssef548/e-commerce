// src/app.ts
import express from 'express';
import userRoutes from './modules/users/user.routes';
import authRoutes from './modules/auth/auth.routes';
const app = express();
app.use(express.json());

// Mount user routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
