import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid2 as Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector( state => state.journal )
  const { body, title, date, onInputChange, formState } = useForm( note )

  const dateString = useMemo(() => {
    const newDate = new Date( date )
    return newDate.toUTCString()
  }, [ date ])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch( setActiveNote( formState ) )
  }, [ formState ])

  useEffect(() => {
    if( messageSaved.length > 0 ) {
      Swal.fire( 'Nota actualizada', messageSaved, 'success' )
    }
  }, [ messageSaved ])

  const onSaveNote = () => {
    dispatch( startSaveNote() )
  }

  const onFileInputChange = ({ target }) => {
    if ( target.files === 0 ) return

    dispatch( startUploadingFiles( target.files ) )
  }

  const onDelete = () => {
    dispatch( startDeletingNote() )
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>

      <Grid>
        <Typography fontSize={ 39 } fontWeight='ligth'>{ dateString }</Typography>
      </Grid>

      <Grid>

        <input
          type='file'
          multiple
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
        />

        <IconButton
          color='primary'
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>

        <Button
          onClick={ onSaveNote }
          disabled={ isSaving }
          color='primary' sx={{ padding: 2 }}>
          <SaveOutlined sx={{ mr: 1, fontSize: 30 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container size={ 12 }>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={ title }
          onChange={ onInputChange }
        />
        
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió en el día de hoy?'
          minRows={ 5 }
          name='body'
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <Grid container size={ 12 } justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={{ mt: 2 }}
          color='error'
          disabled={ isSaving }
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery
        images={ note.imageUrls }
      />

    </Grid>
  )
}