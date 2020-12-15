import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    user: ({ id }) => prisma.post({ id }).user(),
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    likesCount: ({ id }) => prisma.likesConnection({ where: { id } }).aggregate().count(),
    commentsCount: ({ id }) => prisma.commentsConnection({ where: { id } }).aggregate().count(),
    isLiked: ({ id }, _, { user }) => {
      return prisma.$exists.like({ AND: [{ post: { id } }, { user: { id: user.id } }] });
    }
  }
}