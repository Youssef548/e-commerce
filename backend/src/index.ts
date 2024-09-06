// src/app.ts
import express from 'express';
import userRoutes from './modules/users/user.routes';

const app = express();
app.use(express.json());

// Mount user routes
app.use('/api/users', userRoutes);

export default app;
