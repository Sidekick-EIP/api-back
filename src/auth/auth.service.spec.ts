import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { AuthConfig } from "./auth.config";

describe("AuthService", () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        ConfigService,
        JwtService,
        AuthConfig,
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it("should create a new user", async () => {
    await service.register({
      email: "jest@gmail.com",
      password: "Password123",
    });
  });

  it("should login to user", async () => {
    await service.login({ email: "jest@gmail.com", password: "Password123" });
  });

  it("should create a user and login with wrong password", async () => {
    try {
      await service.login({
        email: "jest@gmail.com",
        password: "wrong",
      });
    } catch (e) {
      expect(e.message).toBe("Incorrect username or password.");
    }
  });

  it("login then logout", async () => {
    await service.login({ email: "jest@gmail.com", password: "Password123" });

    await service.logout("jest@gmail.com");
  });

  it("should delete a user", async () => {
    await service.delete({email: "jest@gmail.com", password: "Password123"});
  });
});
