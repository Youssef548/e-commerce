// src/app.ts
import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import errorHandler from "./modules/middlewares/globalErrorHandler";
import swaggerSetup from "./swagger";
import cors from "cors";

const app = express();
app.use(express.json());

// Mount user routes
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
swaggerSetup(app);

app.use(errorHandler);

export default app;
