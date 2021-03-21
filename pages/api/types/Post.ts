import { objectType } from 'nexus'
import { nonNull, extendType, stringArg, intArg } from '@nexus/schema'

const TAKE = 5

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.content()

    t.string('authorId')
    t.date('createdAt')
    t.field('commentsTotalCount', {
      type: 'Int',
      resolve: (parent, arg, { prisma }) =>
        prisma.comment.count({
          where: { postId: parent.id },
        }),
    })
    t.nullable.field('author', {
      type: 'User',
      resolve: (parent, arg, { prisma }) => {
        return prisma.post
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .author()
      },
    })
    t.nullable.field('interact', {
      type: 'Interact',
      resolve: async (parent, arg, { prisma }) => {
        return await prisma.interact.findUnique({
          where: { postId: Number(parent.id) },
        })
      },
    })

    t.list.field('comments', {
      type: 'Comment',
      resolve: async (parent, arg, { prisma }) => {
        const res = await prisma.comment.findMany({
          take: 5,
          where: { postId: Number(parent.id) },
          orderBy: { createdAt: 'desc' },
        })

        return res
      },
    })
  },
})

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.int('endCursor')
    t.boolean('hasNextPage')
  },
})

export const QueryResponse = objectType({
  name: 'QueryResponse',
  definition(t) {
    t.list.field('edges', {
      type: 'Post',
    })

    t.field('pageInfo', {
      type: 'PageInfo',
    })
  },
})

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('postsQuery', {
      type: 'QueryResponse',
      args: { cursor: intArg() },
      async resolve(_, { cursor }, { prisma }) {
        const params: any = {
          take: TAKE,
          orderBy: [{ createdAt: 'desc' }],
        }

        if (cursor) {
          params.skip = cursor ? 1 : 0
          params.cursor = { id: cursor }
        }

        const posts = await prisma.post.findMany(params)

        const pageInfo: any = {}

        if (!posts.length) {
          pageInfo.hasNextPage = false
        } else {
          pageInfo.hasNextPage = true
          pageInfo.endCursor = posts[posts.length - 1].id
        }

        return {
          edges: posts,
          pageInfo,
        }
      },
    })
  },
})

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createNewPost', {
      type: 'Post',
      args: { content: nonNull(stringArg()) },
      async resolve(_, { content }, { prisma, userInfo }) {
        const { id, uuid, email }: any = userInfo

        const post = await prisma.post.create({
          data: {
            title: '',
            content,
            author: {
              connect: { email },
            },
          },
        })

        return post
      },
    })
  },
})
