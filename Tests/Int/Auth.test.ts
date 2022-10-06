import supertest from "supertest";
import prisma from "../../src/Database/Prisma";
import server from "../../src/Index";
import dotenv from "dotenv";
import { generateFactory } from "../Factories/User/CreateUserFactory";
import { deleteFactory } from "../Factories/Delete/DeleteFactories";

dotenv.config();

beforeEach(async () => {
  await deleteFactory.deleteAllData();
});

afterAll(async () => {
  await deleteFactory.deleteAllData();

  prisma.$disconnect();
});

const agent = supertest(server);

describe("POST /sign-up", () => {
  it("Register a new user", async () => {
    const body = await generateFactory.CreateRandomUser();
    const result = await agent.post(`/sign-up`).send(body);
    expect(result.status).toBe(201);
  });
});

describe("POST /sign-in", () => {
  it("Login a user", async () => {
    const body = await generateFactory.CreateRandomUser();
    await agent.post(`/sign-up`).send(body);
    const result = await agent
      .post(`/sign-in`)
      .send({ email: body.email, password: body.password });
    expect(result.status).toBe(200);
  });
});
