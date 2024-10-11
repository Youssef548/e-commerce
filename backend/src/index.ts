// src/app.ts
import express from "express";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import categoryRoutes from "./modules/categories/category.routes";
import errorHandler from "./modules/middlewares/globalErrorHandler";
import swaggerSetup from "./swagger";
import cors from "cors";

const app = express();
app.use(express.json());

// Mount user routes
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
swaggerSetup(app);

app.use(errorHandler);

export default app;
