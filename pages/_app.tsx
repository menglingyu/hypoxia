import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'material-ui-snackbar-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../lib/theme'
import { ApolloProvider } from '@apollo/client'
import { createClient } from '../apollo/client'
import '../lib/style.css'

const globalValues = {
  isSimple: false,
}

export const GlobalContext = React.createContext(globalValues)

export default function MyApp(props) {
  const { Component, pageProps } = props
  const client = createClient()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <GlobalContext.Provider value={globalValues}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 2000 }}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
            <ToastContainer />
          </ThemeProvider>
        </GlobalContext.Provider>
      </ApolloProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
