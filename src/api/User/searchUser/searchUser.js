import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: (_, args) => {
      const { term } = args;
      return prisma.users({ where: { OR: [{ userName_contains: term }, { firstName_contains: term }, { lastName_contains: term }] } });
    }
  }
}