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

// ** Scaffold-ETH Imports
// import React, { FC } from 'react'
import { MainPage } from '~~/components/main/MainPage'
import { TPageProps } from '~~/models/TAppProps'

// Set Home URL based on User Role
const getHomeRoute = (role: any) => {
  // if (role === 'client') return '/acl'
  // else return '/participate'
  return '/participate'
}

// Page
const Page: NextPage<TPageProps> = (props) => {

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user && auth.user.role) {
      // get Home URL
      const homeRoute = getHomeRoute(auth.user.role)
      // redirect user to Home URL
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

      {/* SCAFFOLD-ETH-TYPESCRIPT */}
      <MainPage pageName="main" {...props}></MainPage>
    </>
  )
}

export default Page
