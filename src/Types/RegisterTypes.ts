import { Users } from "@prisma/client";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
