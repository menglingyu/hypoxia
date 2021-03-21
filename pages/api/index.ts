import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from 'apollo-server-micro'
import { GraphQLDate } from 'graphql-iso-date'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { asNexusMethod, makeSchema } from 'nexus'
import path from 'path'
import * as types from './types'
import { createContext } from '../../lib/context'

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

export const schema = makeSchema({
  types: [types, GQLDate],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  contextType: {
    module: path.join(process.cwd(), 'lib/context.ts'),
    export: 'Context',
  },
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({
  schema,
  context: createContext,
}).createHandler({
  path: '/api',
})
