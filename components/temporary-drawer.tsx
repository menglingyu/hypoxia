import React, { useState, useMemo } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import 'braft-editor/dist/index.css'
import { CommentView } from './CommentView'

import { Grid } from '@material-ui/core'
import {
  isSowEditTalkToUserInfo,
  isSowEditVar,
  userInfoVar,
} from '../lib/client-cache'
import { useMutation } from '@apollo/client'
import { COMMENT_FIELDS, CreateOneComment, PostOneQuery } from '../lib/graphql'
import Avatar from './Avatar'

let BraftEditor = null

if (typeof window !== 'undefined') {
  BraftEditor = require('braft-editor').default
}

const useStyles = makeStyles({
  btnNo: {
    marginLeft: '20px',
    backgroundColor: 'rgba(252, 70, 71, 0.8)',
    color: '#fff',
    '& $label': {
      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    },
  },
  btnYes: {
    backgroundColor: '#ADB993',
    color: '#fff',
    '& $label': {
      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    },
  },
  label: {},
})

export default function TemporaryDrawer({ postId }) {
  const classes = useStyles()
  const [createOneComment] = useMutation(CreateOneComment, {
    update(cache, { data: { createOneComment } }) {
      cache.modify({
        id: cache.identify({
          __typename: 'Post',
          id: postId,
        }),
        fields: {
          comments(existingCommentRefs = [], { readField }) {
            const newCommentRef = cache.writeFragment({
              data: createOneComment,
              fragment: COMMENT_FIELDS,
              fragmentName: 'CommentFields',
            })

            // Quick safety check - if the new comment is already
            // present in the cache, we don't need to add it again.
            if (
              existingCommentRefs.some(
                (ref) => readField('id', ref) === createOneComment.id,
              )
            ) {
              return existingCommentRefs
            }

            return [newCommentRef, ...existingCommentRefs]
          },
        },
      })

      isSowEditVar(false)
    },
  })
  const [value, setValue] = useState(null)
  const pageReady = Boolean(BraftEditor)
  const onChange = (content) => setValue(content)
  const talkToUserInfo = isSowEditTalkToUserInfo()
  const userInfo = userInfoVar()

  const handleAddComment = () => {
    const data: any = {
      text: value.toHTML(),
      Post: { connect: { id: postId } },
      user: { connect: { id: userInfo.id } },
    }

    if (talkToUserInfo) data.toUid = talkToUserInfo.id

    createOneComment({ variables: { data } })
  }

  return (
    <div>
      <Drawer
        elevation={10}
        PaperProps={{
          style: {
            width: '700px',
            margin: 'auto',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            height: '80%',
          },
        }}
        anchor="bottom"
        open={isSowEditVar()}
        onClose={() => isSowEditVar(false)}
      >
        <Grid style={{ padding: '32px' }}>
          <Grid direction="row" container style={{ padding: '0 0 20px 0' }}>
            <Grid item>
              <Avatar
                size={40}
                src={userInfo?.avatarUrl}
                aria-label="recipe"
              ></Avatar>
            </Grid>
            <Grid container justify="flex-end" item style={{ flex: 1 }}>
              <Button className={classes.btnYes} onClick={handleAddComment}>
                确定
              </Button>
              <Button
                className={classes.btnNo}
                onClick={() => isSowEditVar(false)}
              >
                取消
              </Button>
            </Grid>
          </Grid>

          <div style={{ paddingLeft: '62px' }}>
            {talkToUserInfo && <CommentView talkToUser={talkToUserInfo} />}
            <div style={{ width: '700px', marginTop: '20px' }}>
              {pageReady && (
                <BraftEditor
                  placeholder="友好是一种能力"
                  contentStyle={{ height: '200px' }}
                  value={BraftEditor.createEditorState(value)}
                  controls={[]}
                  onChange={onChange}
                />
              )}
            </div>
          </div>
        </Grid>
      </Drawer>
    </div>
  )
}
