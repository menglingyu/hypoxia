import { enumType, objectType } from 'nexus'
import { intArg, extendType, stringArg, nonNull } from '@nexus/schema'

export const InteractAction = enumType({
  name: 'InteractAction',
  members: ['value', 'think', 'interest', 'hate', 'hand', 'against'],
  description: '互动类型，有价值、反对、笔芯、感兴趣、出口伤人、拍一拍',
})

export const Interact = objectType({
  name: 'Interact',
  definition(t) {
    t.int('id')
    t.int('postId')
    t.int('commentId')
    t.int('valueCount')
    t.int('interestCount')
    t.int('hateCount')
    t.int('thinkCount')
    t.int('handCount')
    t.int('againstCount')
  },
})

export const InteractMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('interactMutation', {
      type: 'Interact',
      args: {
        postId: nonNull(intArg()),
        count: nonNull(intArg()),
        actionType: 'InteractAction',
      },
      async resolve(_, { actionType, count, postId }, { prisma }) {
        const res = await prisma.interact.upsert({
          where: { postId },
          update: {
            [`${actionType}Count`]: {
              [count > 0 ? 'increment' : 'decrement']: 1,
            },
          },
          create: { postId, [`${actionType}Count`]: 1 },
        })

        await prisma.post.update({
          select: { interactId: true },
          where: { id: postId },
          data: { interactId: res.id },
        })

        return { ...res, actionType }
      },
    })

    t.field('interactCommentMutation', {
      type: 'Interact',
      args: {
        commentId: nonNull(intArg()),
        actionType: nonNull(stringArg()),
        count: nonNull(intArg()),
      },
      async resolve(_, { actionType, count, commentId }, { prisma, userInfo }) {
        const res = await prisma.interact.upsert({
          where: { commentId },
          update: {
            [`${actionType}Count`]: {
              [count > 0 ? 'increment' : 'decrement']: 1,
            },
          },
          create: { commentId, [`${actionType}Count`]: 1 },
        })

        await prisma.comment.update({
          select: { interactId: true },
          where: { id: commentId },
          data: { interactId: res.id },
        })

        return {
          ...res,
          actionType,
        }
      },
    })
  },
})
