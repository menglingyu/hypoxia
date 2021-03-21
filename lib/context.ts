import { PrismaClient } from '@prisma/client'
import { decodedToken } from './token'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  userInfo: any
}

export const createContext = ({ req }: any) => {
  return {
    prisma,
    req,
    userInfo: decodedToken(req, false),
  }
}
