import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ServerSideError } from "../../utils/errors/serverSideError";
import { ClientSideError } from "../../utils/errors/clientSideError";

export const validate = (
  schema: z.ZodSchema<any> = z.any(), // Default schema for body
  paramsSchema?: z.ZodSchema<any> // Optional schema for params
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body (only if schema is provided and it's not z.any())
      schema.parse(req.body);

      // Validate params if paramsSchema is provided
      if (paramsSchema) {
        paramsSchema.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ClientSideError(
          error.errors.map((e) => e.message).join(", "),
          400
        );
      } else {
        throw new ServerSideError("Internal server error", 500);
      }
    }
  };
};
