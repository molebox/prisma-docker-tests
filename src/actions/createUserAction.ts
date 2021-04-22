import { PrismaClient, Prisma } from "@prisma/client";
export interface CreateUserActionParams {
  prisma: PrismaClient;
  email: string;
}
const createUserAction = async ({
  prisma,
  email,
}: CreateUserActionParams): Promise<Prisma.UserCreateInput> => {
  return await prisma.user.create({ data: { email } });
};
export default createUserAction;