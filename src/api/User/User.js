import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    isSelf: async (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = parent;
      const { user } = request;
      if (id === user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
}