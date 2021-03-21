import { queryType } from '@nexus/schema'

export const Query = queryType({
  definition(t) {
    t.crud.user()
    // t.crud.articleComments()
    t.crud.interact()
    t.crud.posts({
      ordering: { id: false },
      pagination: true,
    })
    t.crud.post()
    t.crud.comments()
  },
})
