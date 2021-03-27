import { verify, sign } from 'jsonwebtoken'
import { SECRET, CODE, EXPIRES_IN } from '../constants'

interface DecodedToken {
  (req: any, requireAuth?: boolean):
    | {
        id: number
        email: string
        uuid: string
        avatarUrl: string
        password: string
      }
    | any
}

export const decodedToken: DecodedToken = (req) => {
  const authorization = req.headers.authorization

  if (
    !authorization ||
    authorization === 'null' ||
    authorization === 'undefined'
  ) {
    return null
  }

  console.log('authorizationauthorization', authorization)

  const token = authorization.replace('Bearer ', '')

  const decoded = verify(token, SECRET)

  return decoded

  // if (header) {
  //   try {
  //     const token = header.replace('Bearer ', '')

  //     const decoded = verify(token, SECRET)

  //     return decoded
  //   } catch (error) {
  //     throw new Error(`${CODE.TOKEN_ERROR}: Login in to access resource`)

  //     // if (error.message === 'jwt expired') {
  //     //   return {
  //     //     success: false,
  //     //     code: 'jwt expired',
  //     //   }
  //     // }
  //   }
  // }

  // if (requireAuth) {
  //   throw new Error('Login in to access resource')
  // }

  // return null
}

interface CreateToken {
  ({ name, email, uuid }: { name: string; email: string; uuid: string }): string
}
export const createToken: CreateToken = (user) => {
  return sign(user, SECRET, { expiresIn: EXPIRES_IN })
}
