import { Users } from "@prisma/client";

export interface IRegisterUser {
  name: string;
  email: string;
  passwod: string;
  confirmPassword: string;
}
