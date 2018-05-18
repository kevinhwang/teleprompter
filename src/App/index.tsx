import React from 'react'
import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core'
import Teleprompter from './Teleprompter'

const theme = createMuiTheme({palette: {type: 'dark'}})

export default () => <ThemeProvider theme={theme}>
  <CssBaseline>
    <Teleprompter/>
  </CssBaseline>
</ThemeProvider>
