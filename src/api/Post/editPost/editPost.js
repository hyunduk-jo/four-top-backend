import { prisma } from "../../../../generated/prisma-client";



export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId, title, description, action } = args;
      const { user } = request;
      const exist = await prisma.$exists.post({ id: postId, user: { id: user.id } });
      try {
        if (exist) {
          if (action === DELETE) {
            await prisma.deletePost({ id: postId });
          } else if (action === EDIT) {
            await prisma.updatePost({ where: { id: postId }, data: { title, description } });
          }
        } else {
          throw Error("You can't edit post");
        }
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}