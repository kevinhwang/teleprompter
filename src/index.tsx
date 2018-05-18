import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {ThemeProvider} from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {register as registerServiceWorker} from './serviceWorker'
import {CssBaseline} from '@material-ui/core'

const theme = createMuiTheme({palette: {type: 'dark'}})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>,
  document.getElementById('root'))
registerServiceWorker()
