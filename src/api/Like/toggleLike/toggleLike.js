import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const exist = await prisma.$exists.like({ AND: [{ user: { id: user.id }, post: { id: postId } }] });
      try {
        if (exist) {
          await prisma.deleteManyLikes({ AND: [{ user: { id: user.id } }, { post: { id: postId } }] });
        } else {
          await prisma.createLike({ user: { connect: { id: user.id } }, post: { connect: { id: postId } } });
        }
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}