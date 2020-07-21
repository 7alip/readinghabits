import React, { lazy, Suspense, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Box, Alert } from '@chakra-ui/core'
import { useQuery } from '@apollo/client'

import Loader from '../components/shared/Loader'
import ProfileTabs from '../components/profile/ProfileTabs'
import ProfileHeader from '../components/profile/ProfileHeader'

import { GET_PROFILE_INFO } from '../apollo/queries/index'
import { AuthContext } from '../context/auth-context'

const ProfileUser = lazy(() => import('./ProfileUser'))
const ProfileGroup = lazy(() => import('./ProfileGroup'))

const Profile = () => {
  const { userId } = useContext(AuthContext)
  const { data, loading, error } = useQuery(GET_PROFILE_INFO, {
    variables: { userId },
  })

  if (loading) return <Loader />

  const {
    user_by_pk: { groups, sets },
  } = data

  return (
    <Box>
      <ProfileHeader username="talip" />
      <ProfileTabs />
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert status="error">Hata</Alert>
      ) : (
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/profil">
              <ProfileUser sets={sets} />
            </Route>
            <Route path="/profil/grup">
              <ProfileGroup groups={groups} />
            </Route>
          </Switch>
        </Suspense>
      )}
    </Box>
  )
}

export default Profile
