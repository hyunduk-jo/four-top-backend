import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userName } = args;
      const { user } = request;
      try {
        await prisma.updateUser({ where: { id: user.id }, data: { following: { connect: { userName } } } });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}