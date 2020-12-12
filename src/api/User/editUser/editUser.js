import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userName, firstName, lastName, bio, avatar } = args;
      const { user } = request;
      try {
        await prisma.updateUser({ where: { id: user.id }, data: { userName, firstName, lastName, bio, avatar } });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}