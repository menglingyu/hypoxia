import React, { useState } from 'react'
import Layout from '../components/Layout'
import { toast } from 'react-toastify'

import { useQuery, gql } from '@apollo/client'
import { Grid, makeStyles, NoSsr } from '@material-ui/core'
import UserBanner from '../components/UserBanner'
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded'
import { TextInputCard } from '../components/TextInput'
import { PostQuery } from '../lib/graphql'
import { HomeCardView } from '../components/home/Card'
import { userInfoVar } from '../lib/client-cache'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingView from '../components/LoadingView'

const Home = (...props) => {
  const classes = useStyles()

  const {
    loading,
    error,
    data = { postsQuery: { edges: [] } },
    fetchMore,
  } = useQuery(PostQuery, {})

  const userInfo = userInfoVar()

  if (loading) {
    return <LoadingView />
  }

  const {
    postsQuery: { edges: posts = [], pageInfo = {} },
  } = data

  if (error) return <div>Error: {error.message}</div>

  return (
    <Layout>
      <div className={classes.container}>
        <main>
          <Grid container direction="column" alignItems="stretch">
            <NoSsr>
              <TextInputCard />
            </NoSsr>

            <InfiniteScroll
              pageStart={0}
              loadMore={() => {
                if (!pageInfo.hasNextPage) {
                  toast.warning('没有更多了!')
                  return
                }
                fetchMore({
                  variables: { cursor: pageInfo.endCursor },
                })
              }}
              hasMore={pageInfo.hasNextPage}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {posts.map((post, index) => (
                <Grid className={classes.root} key={index} container>
                  <HomeCardView
                    postId={post.id}
                    content={post.content}
                    author={post.author}
                    interact={post.interact}
                    createdAt={post.createdAt}
                  />
                  {post.comments && post.comments.length ? (
                    <Grid className={classes.discuss}>
                      {post.comments &&
                        post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className={classes.discussContent}
                          >
                            <a className={classes.discussUserName} style={{}}>
                              {comment.user.name}
                            </a>
                            {comment.toUser && [
                              <ArrowForwardRounded
                                key="ArrowForwardRounded"
                                className={classes.arrowForwardRounded}
                                fontSize="small"
                              />,
                              <a
                                key="toUser.name"
                                className={classes.discussUserName}
                              >
                                {comment.toUser.name}
                              </a>,
                            ]}
                            :
                            <span
                              className={classes.discussText}
                              dangerouslySetInnerHTML={{
                                __html: comment.text,
                              }}
                            />
                          </div>
                        ))}
                    </Grid>
                  ) : null}
                </Grid>
              ))}
            </InfiniteScroll>
          </Grid>
          {/* 
            <Grid sm={4} item container>
              <Grid item>
                {userInfo && (
                  <UserBanner
                    author={{
                      name: userInfo.name,
                      avatarUrl: userInfo.avatarUrl,
                    }}
                  />
                )}
              </Grid>
            </Grid> */}
          {/* </Grid> */}
        </main>
      </div>
    </Layout>
  )
}

export default Home

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '736px',
    marginTop: '4rem',
    margin: 'auto',
    padding: '0 2rem',
  },
  root: {
    borderBottom: '1px solid #e9e9f0',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'stretch',
    width: '100%',
  },
  content: { padding: 24 },
  discuss: {
    marginLeft: '80px',
    boxSizing: 'border-box',
    margin: '8px 0px 0px',
    minWidth: '0px',

    borderRadius: '8px',
    flexDirection: 'column',
    padding: '8px',
    marginBottom: '16px',
  },
  discussContent: {
    margin: '0px',
    minWidth: '0px',
    padding: '4px',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
  },
  discussUserName: {
    display: 'flex',
    color: 'rgb(3, 169, 245)',
  },
  discussText: {
    marginLeft: '4px',
    color: '#9999a3',
  },
  arrowForwardRounded: {
    alignSelf: 'center',
    fontSize: '12px',
    margin: '0 10px',
  },
}))
