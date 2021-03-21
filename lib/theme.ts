import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    body2: {
      color: '#4b4b52',
      letterSpacing: '2px',
      wordSpacing: '2px',
      lineHeight: 2,
      fontWeight: 500,
      textAlign: 'left',
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fafafa',
    },
  },
})

export default theme
