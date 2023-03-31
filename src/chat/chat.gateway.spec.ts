import { ConfigService } from "@nestjs/config";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { FileService } from "../file/file.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserInfoService } from "../user_infos/user_infos.service";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { io } from "socket.io-client";
import { AuthService } from "../auth/auth.service";
import { AuthConfig } from "../auth/auth.config";
import { UserInfosDto } from "../user_infos/dto/user.dto";
import { Gender, SportFrequence } from "@prisma/client";

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  const app = testingModule.createNestApplication();
  return app;
}

describe("ChatGateway", () => {
  let gateway: ChatGateway;
  let authService: AuthService;
  let userInfoService: UserInfoService;
  let prismaService: PrismaService;
  let user1;
  let user2;
  let email = "wsTest@gmail.com";
  let password = "@Password123";
  let email2 = "wsTest2@gmail.com";

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserInfoService,
        AuthConfig,
        ConfigService,
        PrismaService,
        FileService,
        ChatGateway,
        ChatService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userInfoService = module.get<UserInfoService>(UserInfoService);
    prismaService = module.get<PrismaService>(PrismaService);
    gateway = module.get<ChatGateway>(ChatGateway);

    await authService.delete({ email, password }).catch(() => {});
    await authService.delete({ email: email2, password }).catch(() => {});

    const userInfos: UserInfosDto = {
      firstname: "Test",
      lastname: "Testo",
      description: "Pas de bio",
      username: "testws",
      birth_date: new Date("03/10/2001"),
      size: 165,
      weight: 65,
      gender: Gender.MALE,
      sport_frequence: SportFrequence.ONCE_A_WEEK,
    };
    const userInfos2: UserInfosDto = {
      firstname: "Test",
      lastname: "Testo",
      description: "Pas de bio",
      username: "testws2",
      birth_date: new Date("03/10/2001"),
      size: 165,
      weight: 65,
      gender: Gender.MALE,
      sport_frequence: SportFrequence.ONCE_A_WEEK,
    };
    await Promise.all([
      authService.register({ email, password }),
      authService.register({ email: email2, password }),
    ]);
    await Promise.all([
      userInfoService.add(userInfos, email),
      userInfoService.add(userInfos2, email2),
    ]);
    user1 = await prismaService.user.findUnique({
      where: {
        email,
      },
    });
    user2 = await prismaService.user.findUnique({
      where: {
        email: email2,
      },
    });
    userInfoService.linkUsers({ id1: user1.id, id2: user2.id });
  }, 10000);

  afterAll(async () => {
    await authService.delete({ email, password }).catch(() => {});
    await authService.delete({ email: email2, password }).catch(() => {});
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("should be able to connect", async () => {
    const app = await createNestApp(
      ChatGateway,
      ChatService,
      PrismaService,
      UserInfoService,
      ConfigService,
      FileService
    );

    await app.init();
    app.listen(8088);

    const client = io("http://localhost:8088", {
      auth: {
        token: user1.id,
      },
    });

    client.on("connect", () => {
      client.disconnect();
      app.close();
    });
  });

  it("should be able to send a message", async () => {
    const app = await createNestApp(
      ChatGateway,
      ChatService,
      PrismaService,
      UserInfoService,
      ConfigService,
      FileService
    );

    await app.init();
    app.listen(8080);

    const client = io("http://localhost:8080", {
      auth: {
        token: user1.id,
      },
    });

    client.on("connect", () => {
      client.emit("message", { message: "Hello" });
      client.disconnect();
      app.close();
    });
  });

  it("should be able to receive a message", async () => {
    const app = await createNestApp(
      ChatGateway,
      ChatService,
      PrismaService,
      UserInfoService,
      ConfigService,
      FileService
    );

    await app.init();
    app.listen(8081);

    const client = io("http://localhost:8081", {
      auth: {
        token: user1.id,
      },
    });
    const client2 = io("http://localhost:8081", {
      auth: {
        token: user2.id,
      },
    });

    client2.on("message", (data) => {
      expect(data).toBe("Hello");
      client.disconnect();
      client2.disconnect();
      app.close();
    });

    client.emit("message", "Hello");
  }, 10000);

  it("should be able to receive events", async () => {
    const app = await createNestApp(
      ChatGateway,
      ChatService,
      PrismaService,
      UserInfoService,
      ConfigService,
      FileService
    );

    await app.init();
    app.listen(8082);

    const client = io("http://localhost:8082", {
      auth: {
        token: user1.id,
      },
    });
    const client2 = io("http://localhost:8082", {
      auth: {
        token: user2.id,
      },
    });

    client2.on("seen", (data) => {});
    client2.on("writing", (data) => {
      client.disconnect();
      client2.disconnect();
      app.close();
    });

    client.emit("seen");
    client.emit("writing");
  }, 10000);

  it("it should be stored in the database", async () => {
    const app = await createNestApp(
      ChatGateway,
      ChatService,
      PrismaService,
      UserInfoService,
      ConfigService,
      FileService
    );

    await app.init();
    app.listen(8083);

    const client = io("http://localhost:8083", {
      auth: {
        token: user1.id,
      },
    });
    const client2 = io("http://localhost:8083", {
      auth: {
        token: user2.id,
      },
    });

    client2.on("message", async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const messages = await prismaService.message.findMany({
        where: {
          from_id: user1.id,
        },
      });
      expect(messages.length).toBe(1);
      client.disconnect();
      client2.disconnect();
      app.close();
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
    client.emit("message", "Hello");
  }, 10000);
});
