// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// ** MUI Components
import Typography from '@mui/material/Typography'

// ** Component Imports
import Spinner from '~/@core/components/spinner'

// ** Hook Imports
import { useAuth } from '~/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: any) => {
  if (role === 'client') return '/acl'
  else return '/participate'
}

const Home: NextPage = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    else {
      console.debug("user NOT AUTHORIZED")
    }
  }, [])

  return (
    <>
      <Spinner />

      <Typography component="h1" variant="h5" gutterBottom>
        ThreeD Garden for FarmBot + ThreeJS
      </Typography>
      <Typography component="h2" variant="h6" gutterBottom>
        FarmBot + ThreeJS using React Three Fiber, MUI v5, Next.js and TypeScript
      </Typography>
    </>
  )
}

export default Home
