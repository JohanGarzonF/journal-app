import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid2 as Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @'],
  password: [ (value) => value.length >= 6, 'El password debe tener más de 6 caracteres'],
  displayName: [ (value) => value.length >= 3, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo(() => status === 'checking', [ status ])

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData, formValidations )

  const onSubmit = ( e ) => {
    e.preventDefault()
    setFormSubmitted( true )
    if ( !isFormValid ) return
    dispatch( startCreatingUserWithEmailPassword( formState ) )
  }

  return (
    <AuthLayout title='Register'>

      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={ onSubmit }>
        <Grid container>
          <Grid
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Nombre Completo'
              type='text'
              placeholder='Nombre completo'
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted }
              helperText={ formSubmitted && displayNameValid }
            />
          </Grid>
          <Grid
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.co'
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted }
              helperText={ formSubmitted && emailValid }
            />
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
          >
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted }
              helperText={ formSubmitted && passwordValid }
            />
          </Grid>

          <Grid container size={ 12 } spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

            <Grid size={{ xs: 12 }} sx={{ display: !!errorMessage ? '' : 'none' }}>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <Button
                disabled={ isCheckingAuthentication }
                type='submit'
                variant='contained'
                fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container display='flex' direction='row' size={ 12 } justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}