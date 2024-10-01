import { NextFunction, Request, Response } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
import asyncHandler from "./asyncHandler";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma";
import { User } from "@prisma/client";

export const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: User["id"];
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) return res.status(401).json({ error: "Unauthorized" });

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
);

export const authorizeAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
);
