import React from 'react'
import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import Image from 'next/image'
import { ICON_POPOVER_DATA } from '../constants'
import { useMutation, gql } from '@apollo/client'
import { Tooltip } from './material-ui'
import {
  InteractMutation,
  InteractCommentMutation,
  POST_FIELDS,
} from '../lib/graphql'

import { INTERACT_FIELDS } from '../lib/graphql'

export default function IconPostPopover({ postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const [interactMutation] = useMutation(InteractMutation, {
    update(cache, { data: { interactMutation } }) {
      // 更新界面点赞数据
      cache.writeFragment({
        id: `Post:${interactMutation.postId}`,
        fragment: gql`
          fragment MyPost on Post {
            id
            interact {
              ...InteractFields
            }
          }
          ${INTERACT_FIELDS}
        `,
        fragmentName: 'MyPost',
        data: {
          id: interactMutation.postId,
          interact: interactMutation,
          __typename: 'Post',
        },
      })
    },
  })

  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div style={{ display: 'flex' }}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <div>
          {Object.entries(ICON_POPOVER_DATA).map(([key, value]) => (
            <Tooltip
              key={key}
              title={value.text}
              onClick={() => {
                interactMutation({
                  variables: {
                    postId,
                    actionType: key.replace('Count', ''),
                    count: 1,
                  },
                })
              }}
            >
              <IconButton>
                <Image src={value.src} alt="a" width={24} height={24} />
              </IconButton>
            </Tooltip>
          ))}
        </div>
      </Popover>
      <Image
        onClick={handleClick}
        src="/add-icon-emoji.svg"
        alt="a"
        width={24}
        height={24}
      />
    </div>
  )
}

export function IconCommentPopover({ commentId }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [interactCommentMutation] = useMutation(InteractCommentMutation, {
    update(
      cache,
      {
        data: {
          interactCommentMutation,
          interactCommentMutation: { commentId },
        },
      },
    ) {
      // 更新界面点赞数据
      cache.writeFragment({
        id: `Comment:${commentId}`,
        fragment: gql`
          fragment CommentFragment on Comment {
            id
            interact {
              ...InteractFields
            }
          }
          ${INTERACT_FIELDS}
        `,
        fragmentName: 'CommentFragment',
        data: {
          id: commentId,
          interact: interactCommentMutation,
          __typename: 'Comment',
        },
      })
    },
  })

  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div style={{ display: 'flex' }}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <div>
          {Object.entries(ICON_POPOVER_DATA).map(([key, value]) => (
            <Tooltip
              key={key}
              title={value.text}
              onClick={() => {
                interactCommentMutation({
                  variables: {
                    commentId,
                    actionType: key.replace('Count', ''),
                    count: 1,
                  },
                })
              }}
            >
              <IconButton>
                <Image src={value.src} alt="a" width={24} height={24} />
              </IconButton>
            </Tooltip>
          ))}
        </div>
      </Popover>
      <Image
        onClick={handleClick}
        src="/add-icon-emoji.svg"
        alt="a"
        width={24}
        height={24}
      />
    </div>
  )
}
