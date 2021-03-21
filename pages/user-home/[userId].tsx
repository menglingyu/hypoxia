import React, { useState } from 'react'
import randomcolor from 'randomcolor'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { userInfoVar } from '../../lib/client-cache'
import Layout from '../../components/Layout'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Avatar from '../../components/Avatar'
import { useQuery, gql } from '@apollo/client'
import LoadingView from '../../components/LoadingView'

const USER_POST_QUERY = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      posts {
        id
        createdAt
        content
      }
    }
  }
`

const UserHome = () => {
  const classes = useStyles()
  const userInfo = userInfoVar()

  console.log('userInfo', userInfo)

  const { loading, error, data } = useQuery(USER_POST_QUERY, {
    skip: !userInfo,
    variables: {
      where: { id: userInfo?.id },
    },
  })

  if (loading) return <LoadingView />

  const userThinkingRecord =
    data?.user?.posts?.map((post) => ({
      id: post.id,
      title: '',
      text: post.content,
      date: post.createdAt,
    })) || []

  console.log('userThinkingRecord', userThinkingRecord)

  // const {
  //   user: {
  //     posts: [],
  //   },
  // } = data

  const Icon = () => (
    <Avatar src={userInfo?.avatarUrl} uid={userInfo?.id} size={60}></Avatar>
  )

  return (
    <Layout>
      <Grid></Grid>
      <Grid className={classes.root}>
        <VerticalTimeline className={classes.separator}>
          {userThinkingRecord.map(({ title, text, date, id }) => (
            <VerticalTimelineElement
              key={id}
              className="vertical-timeline-element--work"
              luminosity="dark"
              dateClassName={classes.date}
              contentStyle={{
                background: randomcolor({
                  // hue: 'blue',
                  format: 'rgba',
                  alpha: 0.5,
                }),
                color: '#fff',
              }}
              date={date}
              // iconStyle={{ boxShadow: '0 0 0 10px #fafafa' }}
              icon={<Icon />}
            >
              <Typography
                className={classes.text}
                component="span"
                variant="body2"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Grid>
    </Layout>
  )
}

const useStyles = makeStyles(({ palette }) => ({
  root: {
    width: '916px',
    margin: 'auto',
  },
  left: {
    width: '600px',
  },
  right: {
    marginLeft: '16px',
    width: '300px',
  },
  content: {
    paddingLeft: '62px',
  },
  box: {
    display: 'flex',
    marginBottom: '16px',
  },
  text: {
    '&>p': {
      color: '#4E3D42',
      marginTop: 0,
    },

    // fontWeight: 600,
    // fontSize: '14px',
    // marginLeft: '22px',
    // color: '#4b4b52',
  },
  separator: {
    marginTop: '80px',
    '&:before': {
      backgroundImage: 'url(/dot-icon.svg)',
      backgroundRepeat: 'repeat-y',
      backgroundColor: 'transparent',
      width: '8px',
      transform: 'translateX(-2px)',
    },
  },
  date: {
    color: '#888',
  },
}))

export default UserHome
