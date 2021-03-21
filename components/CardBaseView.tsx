import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Grid, Typography } from '@material-ui/core'
import Avatar from './Avatar'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    padding: '16px 0',
  },
  content: {
    paddingLeft: '62px',
  },
  box: {
    display: 'flex',
  },
  text: {
    fontWeight: 600,
    fontSize: '14px',
    marginLeft: '22px',
    color: '#4b4b52',
  },
}))

export const CardBaseView = ({ avatar, name, children }) => {
  const styles = useStyles()

  // const imageSize =

  return (
    <Grid className={styles.root}>
      <Grid className={styles.box}>
        <Avatar src={avatar} aria-label="recipe"></Avatar>
        <Typography className={styles.text}>{name}</Typography>
      </Grid>
      <Grid className={styles.content}>{children}</Grid>
    </Grid>
  )
}
