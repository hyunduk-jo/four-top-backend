import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { title, description, files } = args;
      const { user } = request;
      try {
        const post = await prisma.createPost({ title, description, user: { connect: { id: user.id } } });
        files.forEach(async (url) => await prisma.createFile({ url, post: { connect: { id: post.id } } }));
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}