import { mutationType } from '@nexus/schema'

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser()
    t.crud.upsertOneUser()

    t.crud.createOnePost()
    t.crud.deleteOnePost()
    t.crud.upsertOnePost()
    t.crud.createOneComment()
    // t.crud.updateOneInteract()
  },
})
