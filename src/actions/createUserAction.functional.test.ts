import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";
import createServer from "../create-server";

const prisma = new PrismaClient();
const server = createServer({ prisma });
let internalConfig: any = {};

beforeAll(async (done) => {
  const instance = await server.listen({ port: 80 });
  internalConfig.server = instance;
  done();
});

afterAll(async (done) => {
 internalConfig.server.close();
 await prisma.$disconnect();
 done();
});

describe("createUserAction() - functional", () => {
  it("creates new user correctly", async () => {
    const email = `${uuidv4()}@test.com`;

    const res = await fetch(`http://localhost/new-user/${email}`);

    expect(res.ok).toBe(true);
  });

  it("fails if tries to create records with the same user twice", async () => {
    const email = `${uuidv4()}@test.com`;

    await prisma.user.create({ data: { email } });

    const res = await fetch(`http://localhost/new-user/${email}`);

    expect(res.ok).toBe(false);
  });
});