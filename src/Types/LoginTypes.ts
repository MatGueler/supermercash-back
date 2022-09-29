import { Users } from "@prisma/client";

export type ILoginUser = Omit<Users, "id" | "name">;
