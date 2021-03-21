import { makeVar } from '@apollo/client'

// const localStorage = global.localStorage && localStorage

export const isLoggedInVar = makeVar<boolean>(
  global.localStorage && !!localStorage.getItem('token'),
)
export const tokenVar = makeVar<any>(
  global.localStorage && localStorage.getItem('token'),
)
export const userInfoVar = makeVar<any>(
  global.localStorage && JSON.parse(localStorage.getItem('userInfo')),
)

export const isSowEditVar = makeVar<any>(false)
export const isSowEditTalkToUserInfo = makeVar<any>(null)
