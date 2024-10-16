import { TurnedInNot } from '@mui/icons-material'
import {
  Grid2 as Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch()
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title
    }, [ title ])

    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
    }

    return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
            <TurnedInNot />
            </ListItemIcon>
            <Grid container display='block'>
            <ListItemText primary={ newTitle } />
            <ListItemText sx={{}} secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
