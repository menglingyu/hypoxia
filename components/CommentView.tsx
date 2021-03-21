import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from './Avatar'
import { IconButton } from './material-ui'
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded'
import { Row, Item } from '@mui-treasury/components/flex'
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info'
import { useTutorInfoStyles } from '@mui-treasury/styles/info/tutor'
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized'
import { getInteract } from '../constants'

import { Button, Grid, Typography } from '@material-ui/core'
import { CardBaseView } from './CardBaseView'
import { EmojiChipIcon } from './Emoji'
import { IconCommentPopover } from './IconPopover'
import { isSowEditVar, isSowEditTalkToUserInfo } from '../lib/client-cache'

const useStyles = makeStyles(({ palette }) => ({
  icons: {
    display: 'flex',
    marginTop: '30px',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      marginRight: '6px',
    },
  },
  action: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}))

export const ChattView = React.memo(function ChatViewBase({
  talkUser,
  talkToUser,
  content,
  user,
  interact,
  commentId,
}: any) {
  const classes = useStyles()

  const interactArr = interact ? getInteract(interact) : []

  return (
    <CardBaseView avatar={talkUser?.avatarUrl} name={talkUser?.name}>
      <>
        {talkToUser && <CommentView talkToUser={talkToUser} />}
        <Typography
          style={{ marginTop: '16px' }}
          variant="body2"
          component="div"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Grid className={classes.icons}>
          {interactArr.map(({ src, count }, index) => (
            <EmojiChipIcon key={index} src={src} count={count} />
          ))}
          <Grid>
            <IconCommentPopover commentId={commentId} />
          </Grid>
          <Grid
            style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
          >
            <Button
              onClick={() => {
                isSowEditVar(true)
                isSowEditTalkToUserInfo(talkUser)
              }}
            >
              回复
            </Button>
          </Grid>
        </Grid>
      </>
    </CardBaseView>
  )
})

export const CommentView = React.memo(function TutorCard({ talkToUser }: any) {
  const styles = useStyles()
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 })

  return (
    <Row p={1.5} gap={2} bgcolor={'#f5f5f5'} borderRadius={16}>
      <Item style={{ flex: 1 }} ml={1} position={'middle'}>
        <IconButton className={styles.action} classes={iconBtnStyles}>
          <ArrowForwardRounded />
        </IconButton>
      </Item>
      <Item>
        <Avatar src={talkToUser.avatarUrl} />
      </Item>

      <Info position={'middle'} useStyles={useTutorInfoStyles}>
        <InfoTitle>{talkToUser.name}</InfoTitle>
        <InfoSubtitle>{talkToUser.stateText}</InfoSubtitle>
      </Info>
    </Row>
  )
})
