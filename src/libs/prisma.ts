import { PrismaClient } from "@shizuoka-its/core";

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Creating new PrismaClient instance");
  }
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

if (process.env.NODE_ENV !== "production") {
  process.on("beforeExit", async () => {
    if (globalThis.prismaGlobal) {
      await globalThis.prismaGlobal.$disconnect();
    }
  });
}

const client = globalThis.prismaGlobal ?? prismaClientSingleton();

export default client;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = client;
