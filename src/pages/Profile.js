import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/core'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileTabs from '../components/profile/ProfileTabs'
import Loader from '../components/shared/Loader'

const ProfileUser = lazy(() => import('./ProfileUser'))
const ProfileGroup = lazy(() => import('./ProfileGroup'))

const Profile = () => {
  return (
    <Box>
      <ProfileHeader username="talip" />
      <ProfileTabs />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/profil">
            <ProfileUser />
          </Route>
          <Route path="/profil/grup">
            <ProfileGroup />
          </Route>
        </Switch>
      </Suspense>
    </Box>
  )
}

export default Profile
