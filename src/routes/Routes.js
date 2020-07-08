import React, { lazy, Suspense } from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import Route from './Route'
import { Spinner, Flex } from '@chakra-ui/core'
import Layout from '../components/layout/Layout'

const IndexPage = lazy(() => import('../pages/Index'))
const HomePage = lazy(() => import('../pages/Home'))
const ProfilePage = lazy(() => import('../pages/Profile'))
const GroupPage = lazy(() => import('../pages/Group'))
const GroupsPage = lazy(() => import('../pages/Groups'))
const NotFoundPage = lazy(() => import('../pages/404'))
const LibraryPage = lazy(() => import('../pages/Library'))
const AuthPage = lazy(() => import('../pages/Auth'))

const routes = [
  {
    path: '/',
    component: IndexPage,
    exact: true,
  },
  {
    path: '/giris',
    component: HomePage,
  },
  {
    path: '/profil',
    component: ProfilePage,
    isPrivate: true,
  },
  {
    path: '/gruplar',
    component: GroupsPage,
    exact: true,
  },
  {
    path: '/gruplar/:grupId',
    component: GroupPage,
    isPrivate: true,
  },
  {
    path: '/kutuphane',
    component: LibraryPage,
  },
  {
    path: '/hesap',
    component: AuthPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
]

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <Flex h="full" justify="center" align="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          }
        >
          <Switch>
            {routes.map((route, i) => (
              <Route
                key={i}
                exact={route.exact}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default Routes
