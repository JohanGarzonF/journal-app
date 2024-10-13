import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid2 as Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks'


export const NavBar = ({ drawerWidth }) => {

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch( startLogout() )
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${ drawerWidth }px)` },
        ml: `${ drawerWidth }px`
     }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container
          direction='row'
          size={ 12 }
          justifyContent='space-between'
          alignContent='center'
        >
          <Typography variant='h6' noWrap component='div' alignSelf='center'>JournalApp</Typography>

          <IconButton onClick={ onLogout } color='error'>
            <LogoutOutlined/>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}