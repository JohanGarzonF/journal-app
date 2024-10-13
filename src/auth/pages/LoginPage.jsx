import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { Alert, Button, Grid2 as Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth )

  const dispatch = useDispatch()

  const { email, password, onInputChange, onResetForm } = useForm(formData)

  const isAuthenticating = useMemo( () => status === 'checking', [ status ] )

  const onSubmit = ( e ) => {
    e.preventDefault()
    dispatch( startLoginWithEmailPassword({ email, password }) )
    onResetForm()
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn')
    dispatch( startGoogleSignIn() )
  }


  return (
    <AuthLayout title='Login'>

      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={ onSubmit }>
        <Grid container>
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
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ display: !!errorMessage ? '' : 'none', mt: 1 }}>
            <Alert severity='error'>{ errorMessage }</Alert>
          </Grid>

          <Grid container size={ 12 } spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                disabled={ isAuthenticating }
                type='submit'
                variant='contained'
                fullWidth>
                  Login
                </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                disabled={ isAuthenticating }
                onClick={ onGoogleSignIn }
                variant='contained'
                fullWidth
                >
                <Google />
                <Typography sx={{ ml: 1  }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container display='flex' direction='row' size={ 12 } justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}