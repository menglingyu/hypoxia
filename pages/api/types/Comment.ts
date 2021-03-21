import { objectType } from 'nexus'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.int('id')
    t.int('userId')
    t.int('toUid')
    t.string('text')
    t.int('postId')

    t.nullable.field('user', {
      type: 'User',
      resolve: (parent, arg, { prisma }) => {
        return prisma.user.findUnique({
          where: { id: Number(parent.userId) },
        })
      },
    })

    t.nullable.field('toUser', {
      type: 'User',
      resolve: (parent, arg, { prisma }) => {
        return prisma.user.findUnique({
          where: { id: Number(parent.toUid) },
        })
      },
    })

    t.nullable.field('interact', {
      type: 'Interact',
      resolve: async (parent, arg, { prisma }) => {
        return await prisma.interact.findUnique({
          where: { commentId: Number(parent.id) },
        })
      },
    })
  },
})
