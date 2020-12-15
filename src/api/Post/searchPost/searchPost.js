import { prisma } from "../../../../generated/prisma-client"

export default {
  Query: {
    searchPost: (_, { term }) => prisma.posts({ where: { OR: [{ title_contains: term }, { description_contains: term }] } })
  }
}