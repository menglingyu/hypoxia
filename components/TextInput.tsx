import React, { useState, useMemo } from 'react'

import { useMutation, gql } from '@apollo/client'

import { Grid } from '@material-ui/core'
import 'braft-editor/dist/index.css'
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over'
import 'braft-editor/dist/index.css'

import { CreateNewPost, POST_FIELDS } from '../lib/graphql'
import Image from 'next/image'
import { toast } from 'react-toastify'

let BraftEditor = null

if (typeof window !== 'undefined') {
  BraftEditor = require('braft-editor').default
}

export const TextInput = () => {
  const [value, setValue] = useState(null)

  const [createNewPost] = useMutation(CreateNewPost, {
    update(cache, { data: { createNewPost } }) {
      cache.modify({
        fields: {
          postsQuery(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: createNewPost,
              fragment: POST_FIELDS,
              fragmentName: 'PostFields',
            })

            return {
              ...existingTodos,
              edges: [newTodoRef, ...existingTodos.edges],
            }
          },
        },
      })
    },
    onCompleted: () => {
      toast.success('发布成功', {
        delay: 700,
      })
      setValue(null)
    },
  })

  const pageReady = Boolean(BraftEditor)

  const onChange = (content) => {
    setValue(content)
  }

  const extendControls = [
    {
      key: 'my-component',
      type: 'component',
      component: (
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 12,
          }}
        >
          <Image
            onClick={() =>
              createNewPost({ variables: { content: value.toHTML() } })
            }
            src="/send.svg"
            width={24}
            height={24}
          />
        </div>
      ),
    },
  ]

  return (
    pageReady && (
      <BraftEditor
        contentStyle={{ height: '200px' }}
        value={BraftEditor.createEditorState(value)}
        extendControls={extendControls}
        textBackgroundColor={false}
        stripPastedStyles={true}
        controls={[
          'clear',
          'media',
          'bold',
          'strike-through',
          'blockquote',
          'undo',
        ]}
        onChange={onChange}
      />
    )
  )
}

export const TextInputCard = () => {
  const styles = useOverShadowStyles({})
  return (
    <Grid
      style={{ margin: '10px 0 30px 0', borderRadius: '12px' }}
      classes={styles}
    >
      <TextInput />
    </Grid>
  )
}
