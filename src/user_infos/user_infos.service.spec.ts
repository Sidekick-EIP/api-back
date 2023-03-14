import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UserInfoService } from "./user_infos.service";
import { AuthService } from "../auth/auth.service";
import { AuthConfig } from "../auth/auth.config";
import { UserInfosDto } from "./dto/user.dto";
import { Gender, SportFrequence } from "@prisma/client";
import { EditInfosDto } from "./dto/edit.dto";
import { FileService } from "../file/file.service";

describe("UserInfoService", () => {
	let service: UserInfoService;
	let prisma: PrismaService;
	let authService: AuthService;
	let id1: string;
	let id2: string;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserInfoService, PrismaService, AuthService, AuthConfig, ConfigService, JwtService, FileService],
		}).compile();
		
		service = module.get<UserInfoService>(UserInfoService);
		authService = module.get<AuthService>(AuthService);
		prisma = module.get<PrismaService>(PrismaService);

		await authService.register({email: "jestUserInfos@gmail.com", password: "Password123"});
		await authService.register({email: "jestUserInfosSidekick@gmail.com", password: "Password123"});
		id1 = (await (prisma.user.findUnique({ where: { email: "jestUserInfos@gmail.com" } }))).id;
		id2 = (await (prisma.user.findUnique({ where: { email: "jestUserInfosSidekick@gmail.com" } }))).id;
	}, 15000)

	beforeEach(async () => {
		await prisma.userData.deleteMany({where: {userId: id1}})
		await prisma.userData.deleteMany({where: {userId: id2}})
	}, 15000)

	afterEach(async () => {
		await prisma.userData.deleteMany({where: {userId: id1}})
		await prisma.userData.deleteMany({where: {userId: id2}})
	}, 15000)

	afterAll(async () => {
		await authService.delete({email: "jestUserInfos@gmail.com", password: "Password123"});
		await authService.delete({email: "jestUserInfosSidekick@gmail.com", password: "Password123"});
	}, 15000)

	it("should be defined", async () => {
	  expect(service).toBeDefined();
	  expect(prisma).toBeDefined();
	});

	it("should create user infos", async () => {
		const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testi",
			birth_date: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
		const userInfos1 = await service.add(userInfos, "jestUserInfos@gmail.com")
		expect(userInfos1.firstname).toBe(userInfos.firstname)
		expect(userInfos1.userId).toBe(id1)
		expect(userInfos1.sidekick_id).toBe(null)
	}, 15000)

	it("should update user infos", async () => {
		const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testi",
			birth_date: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
		const userInfos1 = await service.add(userInfos, "jestUserInfos@gmail.com")
		const userInfosEdit: EditInfosDto = {
			firstname: "Alex",
			lastname: "Anto",
			description: "Pas de bio",
			username: "Testi",
			size: 168,
			weight: 62,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.TWICE_A_WEEK
		}
		const newUserInfo = await service.update(userInfosEdit, "jestUserInfos@gmail.com")
		expect(newUserInfo.firstname).toBe("Alex")
		expect(newUserInfo.userId).toBe(userInfos1.userId)
		expect(newUserInfo.sidekick_id).toBe(null)
		expect(newUserInfo.size).toBe(168)

		const userInfosEdit2: EditInfosDto = {
			firstname: "Alex",
			lastname: "Anto",
			description: "Pas de bio",
			username: "Testi",
			sport_frequence: SportFrequence.NEVER
		}
		const newUserInfo2 = await service.update(userInfosEdit2, "jestUserInfos@gmail.com")
		expect(newUserInfo2.size).toBe(168)
		expect(newUserInfo2.sport_frequence).toBe(SportFrequence.NEVER)
	}, 15000)

	it("should get user infos from Email", async () => {
		const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testi",
			birth_date: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
		await service.add(userInfos, "jestUserInfos@gmail.com")

		service.find("cet email n existe pas")
		.then((infos) => expect(infos).toBeUndefined())
		.catch((err) => expect(err.status).toBe(404));

		const user1 = await service.find("jestUserInfos@gmail.com")
		expect(user1.userId).toBe(id1)
		expect(user1.username).toBe("Testi")
	}, 15000)

	it("should get user infos of Sidekick", async () => {
		const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testi",
			birth_date: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
		await service.add(userInfos, "jestUserInfos@gmail.com")
		userInfos.username = "Testa"
		await service.add(userInfos, "jestUserInfosSidekick@gmail.com")

		service.findSidekick("cet email n existe pas")
		.then((infos) => expect(infos).toBeUndefined())
		.catch((err) => expect(err.status).toBe(404));

		try {
			await service.findSidekick("jestUserInfos@gmail.com")
		} catch (err) {
			expect(err.status).toBe(404); 
			expect(err.response.message).toBe('User with id ' + id1 + ' doesn\'t have sidekick');
		}

		await service.linkUsers({id1: id1, id2: id2})
		expect((await prisma.userData.findUnique({where: {userId: id1}})).sidekick_id).toBe(id2)
		expect((await prisma.userData.findUnique({where: {userId: id2}})).sidekick_id).toBe(id1)

		const sidekickInfos = await service.findSidekick("jestUserInfos@gmail.com")
		expect(sidekickInfos.bio).toBe("Pas de bio")
		expect(sidekickInfos.firstname).toBe("Test")
		expect(sidekickInfos.frequence_sportive).toBe(SportFrequence.ONCE_A_WEEK)
		expect(sidekickInfos.lastname).toBe("Testo")
	}, 15000)

	it("should link users", async () => {
		const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testi",
			birth_date: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
		await service.add(userInfos, "jestUserInfos@gmail.com")
		userInfos.username = "Testa"
		await service.add(userInfos, "jestUserInfosSidekick@gmail.com")
		await service.linkUsers({id1: id1, id2: id2})
		expect((await prisma.userData.findUnique({where: {userId: id1}})).sidekick_id).toBe(id2)
		expect((await prisma.userData.findUnique({where: {userId: id2}})).sidekick_id).toBe(id1)
	}, 15000)

	it("should link users but throw an error if user1 or user2 has already a sidekick", async () => {
		const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testi",
			birth_date: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK,
		}
		await service.add(userInfos, "jestUserInfos@gmail.com")
		userInfos.username = "Testa"
		await service.add(userInfos, "jestUserInfosSidekick@gmail.com")
		await service.linkUsers({id1: id1, id2: id2})
		expect((await prisma.userData.findUnique({where: {userId: id1}})).sidekick_id).toBe(id2)
		expect((await prisma.userData.findUnique({where: {userId: id2}})).sidekick_id).toBe(id1)
		service.linkUsers({id1: id1, id2: id2})
		.then()
		.catch((err) => expect(err.status).toBe(409));

		await prisma.userData.update({
			where: {
				userId: id1
			},
			data: {
				sidekick_id: null
			}
		})
		service.linkUsers({id1: id1, id2: id2})
		.then()
		.catch((err) => expect(err.status).toBe(409));
	}, 15000)

	it("should get user infos from id", async () => {
		const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testi",
			birth_date: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
		await service.add(userInfos, "jestUserInfos@gmail.com")
		const user1 = await service.getUserfromId(id1)
		expect(user1.userId).toBe(id1)
		expect(user1.username).toBe("Testi")

		await service.getUserfromId("ca existe pas comme id")
		.then()
		.catch((err) => expect(err.status).toBe(404));
	}, 15000)
})
