// ==============================================================
// RESOURCES

// ** Next Imports
import { Router, useRouter, withRouter, NextRouter } from 'next/router'
// ** Next Types
import type { NextPage, NextComponentType } from "next"
import type { AppProps } from "next/app"

// ** React Imports
import {
  Suspense,
  FC,
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
import '~/config/i18n'
import { defaultACLObj } from '~/config/acl'
import themeConfig from '~/config/themeConfig'

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
// SCAFFOLD-ETH-TS IMPORTS
import '~~/styles/tailwind.css'
import '~~/styles/globals.css'

import createCache from '@emotion/cache'
// import { CacheProvider } from '@emotion/react'
import { EthComponentsSettingsContext, IEthComponentsSettings } from 'eth-components/models'
import { EthersAppContext } from 'eth-hooks/context'
// import { NextComponentType } from 'next'
import { AppContext, AppInitialProps } from 'next/app'
// import React, { FC, ReactNode, Suspense, useState } from 'react'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import { ErrorBoundary, ErrorFallback } from '~common/components'
import { BLOCKNATIVE_DAPPID } from '~~/config/nextjsApp.config'
import { appGetInitialProps } from '~~/functions/nextjs/appGetInitialProps'

// ==============================================================
// IMPORTS COMPLETE
console.debug(`%c====================================`, ccm5)
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
// SCAFFOLD-ETH-TS APP "EthApp"

const cache = createCache({ key: 'next' })

/**
 * 🌱 See ./MainPage.tsx for main app component!
 *
 * This file loads the app async.  It sets up context, error boundaries, styles, etc.
 */
console.debug('init eth app...')

// setup themes for theme switcher
const themes = {
  dark: '', // './styles/ant-dark-theme.css',
  light: '', // './styles/ant-light-theme.css',
}
// load saved theme
const savedTheme = 'light'

// create eth components context for options and API keys
const ethComponentsSettings: IEthComponentsSettings = {
  apiKeys: {
    BlocknativeDappId: BLOCKNATIVE_DAPPID,
  },
}

const ProviderWrapper: FC<{ children?: ReactNode }> = (props) => {
  return (
    <EthComponentsSettingsContext.Provider value={ethComponentsSettings}>
      <EthersAppContext disableDefaultQueryClientRoot={true}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThemeSwitcherProvider themeMap={themes} defaultTheme={savedTheme ?? 'light'}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ErrorBoundary>
          </ThemeSwitcherProvider>
        </ErrorBoundary>
      </EthersAppContext>
    </EthComponentsSettingsContext.Provider>
  )
}
/**
 * ### Summary
 * The main app component is {@see MainPage} `src/components/main/MaingPage.tsx`
 * This component sets up all the providers, Suspense and Error handling
 * @returns
 */
 const EthApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, ...props }) => {
  console.debug('loading eth app...')
  const [queryClient] = useState(() => new QueryClient())

  const { pageProps } = props

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dehydradedState = pageProps.dehydratedState as unknown

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CacheProvider value={cache}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydradedState}>
            <ProviderWrapper>
              <Suspense fallback={<div />}>
                <Component {...props.pageProps} />
              </Suspense>
            </ProviderWrapper>
          </Hydrate>
        </QueryClientProvider>
      </CacheProvider>
    </ErrorBoundary>
  )
}

EthApp.getInitialProps = appGetInitialProps
export const getInitialProps = appGetInitialProps

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
                              <EthApp {...props}>
                                <Component {...pageProps} />
                              </EthApp>
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
