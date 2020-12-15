import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    followingCount: ({ id }) => prisma.usersConnection({ where: { followers_some: { id } } }).aggregate().count(),
    followersCount: ({ id }) => prisma.usersConnection({ where: { following_some: { id } } }).aggregate().count(),
    postsCount: ({ id }) => prisma.postsConnection({ where: { user: { id } } }).aggregate().count(),
    isSelf: async (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      if (id === user.id) {
        return true;
      } else {
        return false;
      }
    },
    isFollowing: async (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      try {
        return prisma.$exists.user({ AND: [{ id: user.id }, { following_some: { id } }] });
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
}