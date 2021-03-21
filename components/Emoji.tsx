import React from 'react'
import { Avatar, Chip, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IconCommentPopover } from './IconPopover'

export const EmojiChipIcon = ({ src, count }: any) => {
  const classes = useStyles()

  return (
    <Chip
      className={classes.root}
      icon={<Avatar className={classes.avatar} src={src} />}
      label={<span className={classes.text}>{`${count}`}</span>}
    />
  )
}

const useStyles = makeStyles(({ palette }) => ({
  icons: {
    display: 'flex',
    marginTop: '30px',
    flexDirection: 'row',
    alignItems: 'center',
  },
  root: {
    height: '28px',
  },
  avatar: {
    width: '18px',
    height: '18px',
  },
  text: { color: '#555' },
}))
