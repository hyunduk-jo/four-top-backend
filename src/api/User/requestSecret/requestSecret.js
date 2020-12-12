import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const exist = await prisma.$exists.user({ email });
      try {
        if (exist) {
          const loginSecret = generateSecret();
          await sendSecretMail(email, loginSecret);
          await prisma.updateUser({ where: { email }, data: { loginSecret } });
        } else {
          throw Error("Email not found. Create account first");
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
}