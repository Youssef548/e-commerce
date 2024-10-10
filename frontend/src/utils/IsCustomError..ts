import { CustomError } from "../types/users/ICustomError";

export function isCustomError(error: unknown): error is CustomError {
  return (
    (error as CustomError).data !== undefined ||
    (error as CustomError).message !== undefined
  );
}
