import { AppBar, Box, Container, CssBaseline, Paper, Toolbar, Typography } from '@material-ui/core'
import { ThemeProvider, useTheme } from '@material-ui/core/styles'
import React from 'react'
import useStyle from './style'
import theme from './theme'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import './style.css'
const MainLayout = props => {
  const classes = useStyle()
  return (
    <div className={classes.root} id='root'>
      <CssBaseline />
      <AppBar elevation={0} color='primary'>
        <Toolbar>
          <Typography variant='h6'>
            Prueba tecnica
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box height={useTheme().spacing(3)} />
      <Container maxWidth='md'>
        <Paper elevation={1}>
          <main>
            {props.children}
          </main>
        </Paper>
      </Container>
      <footer className={classes.footer}>
        <Typography color='inherit'>{`© ${new Date().getFullYear()} Powered by David Morales`}</Typography>
      </footer>
    </div>
  )
}

export default props => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainLayout {...props} />
      </Provider>
    </ThemeProvider>
  )
}
