import { objectType } from 'nexus'
import { v4 as uuidv4 } from 'uuid'
import { sign } from 'jsonwebtoken'
import { hashSync, compareSync } from 'bcrypt'
import {
  SECRET,
  EXPIRES_IN,
  SALT,
  DEFAULT_AVATAR_URL,
  CODE,
} from '../../../constants'
import { nonNull, extendType, stringArg } from '@nexus/schema'
import { createToken } from '../../../lib/token'

export const AuthPayLoad = objectType({
  name: 'AuthPayLoad',
  definition(t) {
    t.string('token')
    t.int('code')
    t.field('user', {
      type: 'User',
    })
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.string('uuid')
    t.string('avatarUrl')
    t.string('password')
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent, arg, { prisma }) =>
        prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .posts(),
    })
  },
})

// export const UserQuery = extendType({
//   type: 'Query',

// })

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'AuthPayLoad',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_, { username, email, password }, { prisma }) {
        const user = await prisma.user.findUnique({
          where: { email: email },
        })

        if (!user)
          return {
            user: null,
            code: CODE.USER_NOT_EXIT_ERROR,
          }

        const isRight = compareSync(password, user.password)

        if (!isRight) {
          return {
            user: null,
            code: CODE.PASSWORD_FAIL_ERROR,
          }
        }

        return {
          user,
          token: createToken(user),
          code: CODE.SUCCESS,
        }
      },
    })

    t.field('createNewUser', {
      type: 'AuthPayLoad',
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        avatarUrl: stringArg(),
      },
      async resolve(_, { name, email, password, avatarUrl }, { prisma }) {
        const params = {
          data: {
            uuid: uuidv4(),
            email,
            name,
            password: hashSync(password, SALT),
            avatarUrl: avatarUrl || DEFAULT_AVATAR_URL,
          },
        }

        const newUser = await prisma.user.create(params)

        return {
          userInfo: newUser,
          token: createToken({
            name: newUser.name,
            uuid: newUser.uuid,
            email: newUser.email,
          }),
        }
      },
    })
  },
})
