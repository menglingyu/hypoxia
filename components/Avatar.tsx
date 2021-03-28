import React from 'react'
import { Link } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'

export default ({ src, size, uid, disabled }: any) => {
  return disabled ? (
    <Avatar
      style={{
        width: size,
        height: size,
      }}
      src={src}
      aria-label="recipe"
    ></Avatar>
  ) : (
    <Link href={`/user-home/${uid}`}>
      <Avatar
        style={{
          width: size,
          height: size,
        }}
        src={src}
        aria-label="recipe"
      ></Avatar>
    </Link>
  )
}
