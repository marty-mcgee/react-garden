// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Redux Store Imports
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from '~/store'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import '~/configs/i18n'
import { defaultACLObj } from '~/configs/acl'
import themeConfig from '~/configs/themeConfig'

// ** Fake-DB Import
import '~/@fake-db'

// ** Apollo Client -- State Management using Cache/Store (via GraphQL)
import { ApolloProvider } from '@apollo/client'
import { client } from '~/api/graphql/client'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from '~/layouts/UserLayout'
import AclGuard from '~/@core/components/auth/AclGuard'
import ThemeComponent from '~/@core/theme/ThemeComponent'
import AuthGuard from '~/@core/components/auth/AuthGuard'
import GuestGuard from '~/@core/components/auth/GuestGuard'
import WindowWrapper from '~/@core/components/window-wrapper'

// ** Component Imports
import Spinner from '~/@core/components/spinner'

// ** Contexts
import { AuthProvider } from '~/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from '~/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from '~/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from '~/@core/utils/create-emotion-cache'

// ** Global css styles
// import stylesGlobal from '~/styles/globals.module.css'

// @fullcalendar styles
// import stylesFCCommon from '~/styles/@fullcalendar/common/main.module.css'
// import stylesFCDayGrid from '~/styles/@fullcalendar/daygrid/main.module.css'
// import stylesFCTimeGrid from '~/styles/@fullcalendar/timegrid/main.module.css'

// DEMO
// import '~/assets/demo/css/style.css'
// import stylesDemo from '~/styles/demo/demo.module.css'

// ** Prismjs Styles
// import 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'
// import 'prismjs/components/prism-jsx'
// import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
// import 'react-perfect-scrollbar/dist/css/styles.css'

// images
import favicon from '~/assets/images/logos/favicon.png'
import appleIcon from '~/assets/images/logos/apple-icon.png'
// import brandLight from '~/assets/images/logos/logo-threedgarden.png'
// import brandDark from '~/assets/images/logos/logo-threedgarden-alt.png'
// import brandText from '~/assets/images/logos/logo-threedgarden-text.png'

// ============================================================
// WORKAROUND -- for ToastPosition bug
// from: node_modules\react-hot-toast\dist\core\types.d.ts
// export declare
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

// ============================================================
// ** Emotion Cache for client
const clientSideEmotionCache = createEmotionCache()

// ============================================================
// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ============================================================
const Guard = ({ children, authGuard, guestGuard }: any) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <div>{children}</div>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ============================================================
// ** Construct App using Function Component (Functional Noun)
const App = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? ((page: any) => <UserLayout>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={reduxStore}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`${themeConfig.templateName}: Admin Dashboard`}</title>
            <meta
              name='description'
              content={`${themeConfig.templateName} app using React Three Fiber (ThreeJS) with MUI v5 on NextJS + GraphQL`}
            />
            <meta name='keywords' content='Architecture, Planning, 3D Plans, Home Ideas, Floor Plans, Garden Planning, 3D Design, Building Plans, Lanscaping Design, Landscaping, Design, 3D Design App, React 3D, ThreeD Garden' />
            <meta name='author' content='Marty McGee, Company Juice' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
            {/* <meta name='viewport' content='initial-scale=1, viewport-fit=cover' /> */}

            {/* <link rel='manifest' href='/site.webmanifest' /> */}

            <meta name='twitter:card' content='Design your home and garden plans in 2D and 3D' />
            <meta name='twitter:site' content='@companyjuice' />
            <meta name='twitter:creator' content='@martymcgee' />

            <meta property='og:title' content='ThreeDGarden' />
            <meta property='og:type' content='website' />
            <meta property='og:description' content='Design your home and garden plans in 2D + 3D' />
            <meta property='og:url' content='https://threedgarden.com' />
            <meta property='og:image' content='https://threedgarden.com/favicon/android-chrome-512x512.png' />
            <meta property='og:image:width' content='512' />
            <meta property='og:image:height' content='512' />

            <link rel='shortcut icon' href={favicon.src} />
            <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
            <link rel='apple-touch-icon' sizes='76x76' href={appleIcon.src} />
            {/* <link rel='apple-touch-icon' sizes='76x76' href='/favicon/apple-touch-icon.png' /> */}
            <link rel='mask-icon' href='/favicon/safari-pinned-tab.svg' color='#5bbad5' />
            <meta name='msapplication-TileColor' content='#da532c' />
          </Head>
          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : { pageSettings: null })}>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeComponent settings={settings}>
                    <WindowWrapper>
                      <Guard
                        authGuard={authGuard}
                        guestGuard={guestGuard}
                      >
                        <AclGuard
                          aclAbilities={aclAbilities}
                          guestGuard={guestGuard}
                        >
                          {getLayout(<Component {...pageProps} />)}
                        </AclGuard>
                      </Guard>
                    </WindowWrapper>
                    <ReactHotToast>
                      <Toaster
                        position={settings.toastPosition as ToastPosition}
                        toastOptions={{ className: 'react-hot-toast' }}
                      />
                    </ReactHotToast>
                  </ThemeComponent>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </CacheProvider>
      </ReduxProvider>
    </ApolloProvider>
  )
}

export default App
