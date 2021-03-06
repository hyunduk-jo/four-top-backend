import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({ where: { email }, data: { loginSecret: null } });
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret conbination");
      }
    }
  }
}