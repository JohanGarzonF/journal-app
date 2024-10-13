import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'


export const SideBar = ({ drawerWidth }) => {

  const { displayName } = useSelector( state => state.auth )
  const { notes } = useSelector( state => state.journal )


  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent' // temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-papper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar
          component='div'
          variant='h6'
          sx={{ width: { sm: drawerWidth } }}
        >
          <Toolbar />
          <Typography>
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />

        <List sx={{ width: { sm: drawerWidth } }}>
          {
            notes.map( note => (
              <SideBarItem key={ note.id } { ...note } />
            ))
          }
        </List>

      </Drawer>
    </Box>
  )
}