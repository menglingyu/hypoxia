import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Grid, Typography } from '../../components/material-ui'

import { getInteract } from '../../constants'
import IconPostPopover from '../IconPopover'
import { EmojiChipIcon } from '../Emoji'
import { NameTimeView } from '../NameTime'
import Link from 'next/link'
import Avatar from '../Avatar'

export const HomeCardView = React.memo(function TutorCard({
  postId,
  author,
  content,
  interact,
  createdAt,
}: any) {
  const classes = useStyles()
  const interactArr = interact ? getInteract(interact) : []

  return (
    <Grid className={classes.shadow}>
      <Grid className={classes.leftBox}>
        <Avatar uid={author.id} src={author?.avatarUrl}></Avatar>
      </Grid>
      <Grid className={classes.rightBox}>
        <Grid>
          <Link href="/post-detail/[id]" as={`/post-detail/${postId}`}>
            <Typography
              className={classes.text}
              component="div"
              variant="body2"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Link>
        </Grid>
        <Grid>
          <NameTimeView uid={author?.id} name={author?.name} time={createdAt} />
        </Grid>
        <Grid className={classes.icons} container alignItems="center">
          {interactArr.map(({ src, count }, index) => (
            <EmojiChipIcon key={index} src={src} count={count} />
          ))}
          <Grid>
            <IconPostPopover postId={postId} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export const DetailCardView = React.memo(function DetailCard({
  postId,
  content,
  interact,
}: any) {
  const classes = useStyles()
  const interactArr = interact ? getInteract(interact) : []

  return (
    <Grid>
      <Grid>
        <Typography
          component="div"
          variant="h4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Grid>
      <Grid className={classes.icons} container alignItems="center">
        {interactArr.map(({ src, count }, index) => (
          <EmojiChipIcon key={index} src={src} count={count} />
        ))}
        <Grid>
          <IconPostPopover postId={postId} />
        </Grid>
      </Grid>
    </Grid>
  )
})

const useStyles = makeStyles(({ palette }) => ({
  shadow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    borderRadius: '1rem',
    alignItems: 'stretch',
    padding: '16px',
    transition: '0.3s',
  },
  text: {
    cursor: 'pointer',
    '&:hover': {
      color: 'rgba(0,153,221,.75)',
    },
  },
  icons: {
    display: 'flex',
    marginTop: '30px',
    '& > *': {
      marginRight: '8px',
    },
  },
  addIcons: { top: '-8px' },
  detailRoot: { flex: 1 },
  leftBox: { marginRight: '26px' },
  rightBox: { flex: 1 },
}))
