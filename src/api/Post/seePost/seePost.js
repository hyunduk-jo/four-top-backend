import { prisma } from "../../../../generated/prisma-client"

export default {
  Query: {
    seePost: (_, { postId }) => {
      return prisma.post({ id: postId });
    }
  }
}