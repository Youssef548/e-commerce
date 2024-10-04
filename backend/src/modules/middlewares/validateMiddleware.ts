import { z, ZodError } from "zod";

import { Request, Response, NextFunction } from "express";
import { ServerSideError } from "../../utils/errors/serverSideError";
import { ClientSideError } from "../../utils/errors/clientSideError";

export const validate = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
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
