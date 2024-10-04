import { User } from "@prisma/client";

export type UserSafety = Omit<User, "password">;
