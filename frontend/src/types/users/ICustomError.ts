export interface CustomError extends Error {
  data?: {
    message: string;
  };
}
