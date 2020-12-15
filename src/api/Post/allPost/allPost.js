import { prisma } from "../../../../generated/prisma-client"

export default {
  Query: {
    allPost: () => {
      return prisma.posts({})
    }
  }
}