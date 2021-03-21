import React from 'react'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { timeFromNow } from '../lib/time'
import Link from 'next/link'

export const NameTimeView = ({ name, time, uid }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Link href={`/user-home`}>{name}</Link>
      <Image width={8} height={8} src="/dot.svg" />
      <time className={classes.conversationItemDate}>
        {time ? timeFromNow(time) : ''}
      </time>
    </div>
  )
}

const useStyles = makeStyles(({}) => ({
  root: {
    textAlign: 'left',
    color: '#9999a3',
    fontSize: '12px',
    lineHeight: '16px',
    marginTop: '8px',
  },
  username: {
    marginRight: '4px',
    color: '#4b4b52',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },
  conversationItemDate: {
    marginLeft: '4px',
    color: '#9999a3',
    fontSize: ' 12px',
    lineHeight: ' 16px',
  },
}))
