import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserInfosController } from './user_infos.controller';
import { UserInfoService } from './user_infos.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { AuthConfig } from '../auth/auth.config';
import { UserInfosDto } from './dto/user.dto';
import { Gender, SportFrequence } from '@prisma/client';
import { EditInfosDto } from './dto/edit.dto';
import { FileService } from '../file/file.service';
import { timeout } from 'rxjs';

describe('UserInfosController', () => {
	let controller: UserInfosController;
	let prisma: PrismaService;
	let authService: AuthService;
	let service: UserInfoService
	let id1: string;
	let id2: string;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
		controllers: [UserInfosController],
			providers: [UserInfoService, PrismaService, AuthService, AuthConfig, ConfigService, FileService],
		}).compile();

		controller = module.get<UserInfosController>(UserInfosController);
		service = module.get<UserInfoService>(UserInfoService);
		authService = module.get<AuthService>(AuthService);
		prisma = module.get<PrismaService>(PrismaService);

		await authService.register({email: "jestUserInfosController@gmail.com", password: "Password123"});
		await authService.register({email: "jestUserInfosControllerSidekick@gmail.com", password: "Password123"});
		id1 = (await (prisma.user.findUnique({ where: { email: "jestUserInfosController@gmail.com" } }))).id;
		id2 = (await (prisma.user.findUnique({ where: { email: "jestUserInfosControllerSidekick@gmail.com" } }))).id;
	});

	beforeEach(async () => {
		await prisma.userData.deleteMany({where: {userId: id1}})
		await prisma.userData.deleteMany({where: {userId: id2}})
	})

	afterEach(async () => {
		await prisma.userData.deleteMany({where: {userId: id1}})
		await prisma.userData.deleteMany({where: {userId: id2}})
	})

	afterAll(async () => {
		await authService.delete({email: "jestUserInfosController@gmail.com", password: "Password123"});
		await authService.delete({email: "jestUserInfosControllerSidekick@gmail.com", password: "Password123"});
	})

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should call getUserInfo', async () => {
		const spy = jest.spyOn(service, 'getUserInfoById');
		const userInfos: UserInfosDto = {
				firstname: "Test",
				lastname: "Testo",
				description: "Pas de bio",
				username: "Testu",
				birthDate: new Date("03/10/2001"),
				size: 165,
				weight: 65,
				gender: Gender.MALE,
				sport_frequence: SportFrequence.ONCE_A_WEEK
			}
		await service.setUserInfo(userInfos, "jestUserInfosController@gmail.com")

		await controller.getUserInfos({user:{email: 'jestUserInfosController@gmail.com'}})
		expect(spy).toHaveBeenCalledWith('jestUserInfosController@gmail.com');
	}, 10000)

  it('should call getSidekickInfo', async () => {
    const spy = jest.spyOn(service, 'getSidekickInfo');
    const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testu",
			birthDate: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
	}
	await service.setUserInfo(userInfos, "jestUserInfosController@gmail.com")
	userInfos.username = "Testy"
	await service.setUserInfo(userInfos, "jestUserInfosControllerSidekick@gmail.com")
    await service.linkUsers({id1, id2})
    await controller.getSidekickInfo({user:{email: 'jestUserInfosControllerSidekick@gmail.com'}})
    expect(spy).toHaveBeenCalledWith('jestUserInfosControllerSidekick@gmail.com');
	await prisma.userData.update({
		where: {
			userId: id1
		},
		data: {
			sidekick_id: null
		}
	})
	await prisma.userData.update({
		where: {
			userId: id2
		},
		data: {
			sidekick_id: null
		}
	})
  }, 10000)

  it('should call setUserInfos', async () => {
    const spy = jest.spyOn(service, 'setUserInfo');
    const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testu",
			birthDate: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
    await controller.setUserInfos({user:{email: 'jestUserInfosController@gmail.com'}}, userInfos)
    expect(spy).toHaveBeenCalledWith(userInfos, 'jestUserInfosController@gmail.com');
  }, 10000)

  it('should call updateInfos', async () => {
    const spy = jest.spyOn(service, 'updateInfos');
    const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testu",
			birthDate: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
		}
    await service.setUserInfo(userInfos, "jestUserInfosController@gmail.com")
    const userInfosEdit: EditInfosDto = {
			firstname: "Alex",
			lastname: "Anto",
			description: "Pas de bio",
			username: "Testu",
			size: 168,
			weight: 62,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
	}
    await controller.updateInfos({user:{email: 'jestUserInfosController@gmail.com'}}, userInfosEdit)
    expect(spy).toHaveBeenCalledWith(userInfosEdit, 'jestUserInfosController@gmail.com');
  }, 10000)

  it('should call link_users', async () => {
    const spy = jest.spyOn(service, 'linkUsers');
    const userInfos: UserInfosDto = {
			firstname: "Test",
			lastname: "Testo",
			description: "Pas de bio",
			username: "Testu",
			birthDate: new Date("03/10/2001"),
			size: 165,
			weight: 65,
			gender: Gender.MALE,
			sport_frequence: SportFrequence.ONCE_A_WEEK
	}
	await authService.register({email: "jestSidekick@gmail.com", password: "Password123"});
	await authService.register({email: "jestSidekickWesh@gmail.com", password: "Password123"});
	const id = (await (prisma.user.findUnique({ where: { email: "jestSidekick@gmail.com" } }))).id;
	const id7 = (await (prisma.user.findUnique({ where: { email: "jestSidekickWesh@gmail.com" } }))).id;
	await service.setUserInfo(userInfos, "jestSidekick@gmail.com")
	userInfos.username = "Crotte"
	await service.setUserInfo(userInfos, "jestSidekickWesh@gmail.com")
    await controller.linkUsers({id1: id, id2: id7})
    expect(spy).toBeCalledWith({id1: id, id2: id7});

	await prisma.userData.deleteMany({where: {userId: id}})
	await prisma.userData.deleteMany({where: {userId: id7}})
	await authService.delete({email: "jestSidekick@gmail.com", password: "Password123"});
	await authService.delete({email: "jestSidekickWesh@gmail.com", password: "Password123"});
  }, 15000)
});
