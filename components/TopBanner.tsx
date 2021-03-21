import React from 'react'
import { Grid, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import Button from '@material-ui/core/Button'
import { userInfoVar } from '../lib/client-cache'
import Avatar from './Avatar'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useApolloClient } from '@apollo/client'
import { isLoggedInVar } from '../lib/client-cache'
import { useRouter } from 'next/router'

const LogoutButton = () => {
  const client = useApolloClient()
  const router = useRouter()

  return (
    <Button
      data-testid="logout-button"
      onClick={() => {
        // client.cache.evict({ fieldName: 'me' })
        client.cache.gc()

        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')

        isLoggedInVar(false)

        router.reload()
      }}
    >
      退出
    </Button>
  )
}

export const TopBanner = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const userInfo = userInfoVar()

  return (
    <header className={classes.header}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          {[
            { to: '/', imgUrl: '/top-banner/home.svg' },
            { to: '/', imgUrl: '/top-banner/message.svg' },
          ].map(({ to, imgUrl }) => (
            <Link className={classes.link} href={to}>
              <Image
                className={classes.img}
                src={imgUrl}
                width={60}
                height={60}
              />
            </Link>
          ))}
        </Grid>

        <Grid item className={classes.right}>
          {!isLoggedInVar() ? (
            <Link href="/signup">登录</Link>
          ) : (
            <Grid item container justify="flex-end">
              <Avatar size={40} src={userInfo?.avatarUrl}>
                {userInfo?.name}
              </Avatar>
              <Button onClick={handleClick}>
                {userInfo?.name && (
                  <span className={classes.name}>{userInfo?.name}</span>
                )}
              </Button>
            </Grid>
          )}

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              {/* onClick={handleClose} */}
              <LogoutButton />
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </header>
  )
}

const useStyles = makeStyles(({ spacing }) => ({
  header: {
    display: 'flex',
    width: '100%x',
    height: '64px',
    padding: '0 10%',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  link: {
    marginRight: '32px',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  img: {
    filter:
      'invert(28%) sepia(5%) saturate(584%) hue-rotate(201deg) brightness(97%) contrast(91%)',
    '&:hover': {
      filter:
        'invert(14%) sepia(10%) saturate(3671%) hue-rotate(159deg) brightness(96%) contrast(89%)',
    },
  },
  name: {
    marginLeft: '20px',
    fontSize: '18px',
  },
}))
