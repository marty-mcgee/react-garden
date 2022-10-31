// ==============================================================
// RESOURCES

// ** Next Imports
import { Router, useRouter, withRouter, NextRouter } from 'next/router'
// ** Next Types
import type { NextPage, NextComponentType } from "next"
import type { AppProps } from "next/app"

// ** React Imports
import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  // JSXElementConstructor,
  // Key,
  useState,
  useEffect,
  useMemo,
} from "react"

// ** Redux Store Imports
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from '~/store' // redux

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports (CSS Caching, used by theme: mui)
import { CacheProvider, EmotionCache } from '@emotion/react'

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

// ** @core Components
import AclGuard from '~/@core/components/auth/AclGuard'
import ThemeComponent from '~/@core/theme/ThemeComponent'
import AuthGuard from '~/@core/components/auth/AuthGuard'
import GuestGuard from '~/@core/components/auth/GuestGuard'
import WindowWrapper from '~/@core/components/window-wrapper'

// ** Layout + Metadata Components
import UserLayout from '~/layouts/UserLayout'
import Header from '~/@core/components/head'
import Spinner from '~/@core/components/spinner'

// ** Contexts
import { AuthProvider } from '~/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from '~/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from '~/@core/styles/libs/react-hot-toast'

// ** Utils
import { createEmotionCache } from '~/@core/utils/create-emotion-cache'

// ** CSS Styles
// import stylesGlobal from '~/styles/globals.module.css'
// import stylesDemo from '~/styles/demo/demo.module.css'
import '~/components/threed/styles/index.css'

// ** HELPFUL UTIL: COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5, ccm6 } from '~/@core/utils/console-colors'

// ==============================================================
// IMPORTS COMPLETE
console.debug('%cThreeDGarden<FC,R3F>: {_app.tsx}', ccm4)
console.debug(`%c====================================`, ccm5)

// ==============================================================
// TYPES + INTERFACES (TYPESCRIPT)
// note: interface throws error if using .babelrc
// "Syntax error: Unexpected reserved word 'interface'."

interface WithRouterProps {
  router: NextRouter
}
interface MyComponentProps extends WithRouterProps {
  heyheyhey: string
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode,
  setConfig: any,
  authGuard: boolean,
  guestGuard: boolean,
  acl: 'manage' | 'all' | 'acl-page' |'read' | 'create' | 'update' | 'delete' // any // aclAbilities
}

type AppPropsWithLayoutEmotion = AppProps & {
  Component: NextPageWithLayout,
  emotionCache?: EmotionCache,
  router: NextRouter
}
// OR INTERFACE ??? no, because we are extending a TYPE, not an INTERFACE
// interface IAppPropsWithLayoutEmotion extends AppProps {
//   Component: NextPageWithLayout,
//   emotionCache?: EmotionCache,
//   router: NextRouter
// }

type MartyComponent = AppPropsWithLayoutEmotion & {
  setConfig: any,
  authGuard: boolean,
  guestGuard: boolean,
  acl: any // aclAbilities
}
// OR INTERFACE ??? no, because we are extending a TYPE, not an INTERFACE
// interface MartyComponent extends NextComponentType {
//   setConfig: any,
//   authGuard: boolean,
//   guestGuard: boolean,
//   acl: any // aclAbilities
// }

// WORKAROUND -- for ToastPosition bug
// from: node_modules\react-hot-toast\dist\core\types.d.ts
// export declare
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

// ==============================================================
// ==============================================================

// ==============================================================
// ** Emotion Cache for client
const clientSideEmotionCache = createEmotionCache()

// ==============================================================
// ** Progress Loader "Pace"

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

// ==============================================================
// ** Security Guard

const Guard = ({ children, authGuard, guestGuard }: any) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <div>{children}</div>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ==============================================================
// MAIN APP

// ==============================================================
// ** Construct App using Function Component (Functional Noun)

// const App = (props: any) => {
const App: FunctionComponent<AppPropsWithLayoutEmotion> = (props: AppPropsWithLayoutEmotion) => {
  //
  // destructure props for vars
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
          <Header />{/* <Header title={pageProps.title} /> */}
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
                          {
                            getLayout(
                              <Component {...pageProps} />
                            )
                          }
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
