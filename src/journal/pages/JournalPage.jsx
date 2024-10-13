import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Typography } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { startNewNote } from '../../store/journal/thunks'
import { useMemo } from 'react'


export const JournalPage = () => {

  const dispatch = useDispatch()
  const { isSaving, active } = useSelector( state => state.journal )

  const isSavingNote = useMemo( () => isSaving, [ isSaving ])

  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum exercitationem officia ad dignissimos harum rerum? Iste odit libero fugit beatae illo architecto obcaecati ratione modi accusantium quo. Veritatis, facilis quibusdam!</Typography> */}

      {
        (!!active)
        ? <NoteView />
        : <NothingSelectedView />
      }


      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSavingNote }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: .9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined/>
      </IconButton>
    </JournalLayout>
  )
}