import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

export const GetCurrentUserEmail = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request?.user?.email;
  }
)

// export const GetCurrentUserId = createParamDecorator(
//   async (data: undefined) => {
//     const config = new ConfigService()
//     const prisma = new PrismaService(config)

//     const res = await prisma.user.findUnique({
//       where: {
//         email: data,
//       },
//     });
//     return res.id;
//   }
// )