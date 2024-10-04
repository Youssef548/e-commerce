import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { GlobalError } from "../../utils/errors/GlobalError";

// Define your custom GlobalError type if not already defined

const errorHandler = (
  err: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // These are Prisma client known request errors, such as constraint violations
    res.status(400).json({
      status: "error",
      message: "A database error occurred. Please check your request.",
    });
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    // This occurs when Prisma cannot connect to the database
    res.status(500).json({
      status: "error",
      message: "Failed to connect to the database. Please try again later.",
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Prisma validation errors (e.g., when a field fails validation)
    res.status(400).json({
      status: "error",
      message: "Validation failed. Please check your input data.",
    });
  } else {
    // Fallback for other errors
    res.status(err.code || 500).json({
      status: "error",
      message: err.message || "An unexpected error occurred.",
    });
  }

  // Optionally log the error for internal monitoring or debugging
  console.error("Error details:", err);
};

export default errorHandler;
