// src/app.ts
import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import { ClientSideError } from "./utils/errors/clientSideError";
import { GlobalError } from "./utils/errors/GlobalError";
const app = express();
app.use(express.json());

// Mount user routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code).json({
    status: "error",
    message: err.message,
  });
});
export default app;
