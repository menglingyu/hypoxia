import { Fab, Grid, Modal } from '@material-ui/core'
import { useRouter } from 'next/router'

import { DetailCardView } from '../../components/home/Card'
import AddIcon from '@material-ui/icons/Add'
import { useReactiveVar } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { PostOneQuery } from '../../lib/graphql'
import { makeStyles } from '@material-ui/core/styles'
import { CommentView, ChattView } from '../../components/CommentView'
import TemporaryDrawer from '../../components/temporary-drawer'
import { isSowEditVar } from '../../lib/client-cache'
import { TopBanner } from '../../components/TopBanner'
import LoadingView from '../../components/LoadingView'

const PostDetail = () => {
  const classes = useStyles()
  const router = useRouter()

  // debugger
  const postId = Number.call(null, router.query.postId)

  const isSowEdit = useReactiveVar(isSowEditVar)

  const { loading, data } = useQuery(PostOneQuery, {
    skip: !postId,
    variables: { where: { id: postId } },
  })

  if (loading) return <LoadingView />
  if (!postId) return null

  const {
    post,
    post: { comments = [] },
  } = data

  return (
    <div className={classes.root}>
      <div className={classes.topRoot}>
        <TopBanner />
        <Grid container item style={{ backgroundColor: '#fff' }}>
          <Grid container className={classes.titleCard}>
            <DetailCardView
              postId={post.id}
              content={post.content}
              author={post.author}
              interact={post.interact}
            />
          </Grid>
        </Grid>
      </div>
      <Grid direction="column" container className={classes.content}>
        {comments &&
          comments.map(({ id, text, user, toUser, interact }, index) => {
            return (
              <Grid key={index} className={classes.cardBox}>
                <ChattView
                  commentId={id}
                  content={text}
                  talkUser={user}
                  talkToUser={toUser}
                  interact={interact}
                />
              </Grid>
            )
          })}
      </Grid>
      <div className={classes.fab}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => isSowEditVar(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <TemporaryDrawer postId={post.id} />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  topRoot: {
    backgroundColor: '#fff',
  },
  titleCard: {
    padding: '20px',
    width: '600px',
    margin: 'auto',
  },
  fab: { position: 'fixed', bottom: '80px', right: '60px' },
  content: {
    margin: '20px auto',
    width: '600px',
  },
  cardBox: {
    borderBottom: '1px solid #e9e9f0',
  },
}))

export default PostDetail
