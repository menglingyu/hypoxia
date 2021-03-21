import React, { useState } from 'react'
import Router from 'next/router'

import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { SignupMutation, LOGIN } from '../lib/graphql'
import { userInfoVar } from '../lib/client-cache'
import { TextField, Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { isLoggedInVar } from '../lib/client-cache'
import { TopBanner } from '../components/TopBanner'
import md5 from 'blueimp-md5'
import { CODE } from '../constants'
import LoadingView from '../components/LoadingView'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h2: {
      fontWeight: 700,
    },
    top: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
      boxSizing: 'border-box',
      padding: '32px 0 64px 0',
    },
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '120px',
    },
    formStyle: {
      display: 'flex',
      flexDirection: 'column',
      width: '320px',
      height: '370px',
      justifyContent: 'space-around',
    },
  }),
)

function Signup(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const classes = useStyles()

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      username: name,
      email,
      password: md5(password),
    },
    onCompleted: ({ login: { code, token, user } }) => {
      if (code === CODE.USER_NOT_EXIT_ERROR) {
        toast.error('用户不存在,正在注册')
        signup()
      } else if (code === CODE.PASSWORD_FAIL_ERROR) {
        toast.error('密码错误')
      } else if (code === CODE.SUCCESS) {
        if (token) localStorage.setItem('token', `Bearer ${token}`)

        localStorage.setItem('userInfo', JSON.stringify(user))

        toast.success('登录成功')
        router.replace('/')
      }
    },
  })

  const [signup] = useMutation(SignupMutation, {
    onCompleted: ({ createNewUser: { token, userInfo } }) => {
      if (token) localStorage.setItem('token', `Bearer ${token}`)

      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      isLoggedInVar(true)

      userInfoVar(userInfo)

      toast.success('登录成功', {
        delay: 200,
        onClose: () => Router.push('/'),
      })
    },
  })

  return (
    <div>
      {loading && <LoadingView />}
      <TopBanner />
      <header className={classes.top}>
        <Typography className={classes.h2} variant="h4">
          与富有善意的思考者们友好地讨论问题
        </Typography>
      </header>
      <div className={classes.root}>
        <form
          className={classes.formStyle}
          onSubmit={async (e) => {
            e.preventDefault()

            login()
          }}
        >
          <TextField
            label="用户名"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <TextField
            label="邮箱"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="请输入邮箱地址"
            type="text"
            value={email}
          />
          <TextField
            label="密码"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            type="text"
            value={password}
          />
          <Button type="submit" variant="contained" color="primary">
            登录 / 注册
          </Button>
          {/* <TextField disabled={!name || !email} type="submit" value="Signup" />
        <a className="back" href="#" onClick={() => Router.push('/')}>
          or Cancel
        </a> */}
        </form>
      </div>
    </div>
  )
}

export default Signup
