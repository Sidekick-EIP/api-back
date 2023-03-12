import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UserInfoService } from "./user_infos.service";
import { FileService } from "../file/file.service";

describe("AuthService", () => {
	let service: UserInfoService;
	let prisma: PrismaService;
  
	beforeEach(async () => {
	  const module: TestingModule = await Test.createTestingModule({
		providers: [
		  UserInfoService,
		  PrismaService,
		  ConfigService,
		  JwtService,
      FileService
		],
	  }).compile();
  
	  prisma = module.get<PrismaService>(PrismaService);
	  service = module.get<UserInfoService>(UserInfoService);
	});
  
	it("should be defined", async () => {
	  expect(service).toBeDefined();
	  expect(prisma).toBeDefined();
	});

	it("should create user infos", async () => {
	  
	})

	it("should modify user infos", async () => {
	  
	})

	it("should delete user infos", async () => {
	  
	})

	it("should get user infos from Email", async () => {
	  
	})

	it("should link users", async () => {
	  
	})
  });
