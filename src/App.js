import React, { useState, createContext, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Spinner, Alert, Select, Box } from '@chakra-ui/core'

import IndexPage from './pages/Index'
import HomePage from './pages/Home'
import ProfilePage from './pages/Profile'
import GroupPage from './pages/Group'
import GroupsPage from './pages/Groups'
import NotFoundPage from './pages/404'
import SettingsPage from './pages/Settings'
import AppTest from './src_test/AppTest'

const GET_USERS = gql`
  query getUsers {
    user {
      id
      username
    }
  }
`

export const AuthContext = createContext()

function App() {
  const { loading, error, data } = useQuery(GET_USERS)
  const [userId, setUserId] = useState()

  useEffect(() => {
    if (data && data.user[0]) {
      setUserId(data.user[0].id)
    }
  }, [data])

  if (loading) return <Spinner />
  if (error) return <Alert status="error">Error</Alert>

  return (
    <AuthContext.Provider value={{ userId }}>
      <Box position="fixed" top={3} right={16}>
        <Select onChange={e => setUserId(e.target.value)}>
          {data.user.map(u => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </Select>
      </Box>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/group" component={GroupsPage} />
          <Route exact path="/group/:id" component={GroupPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route path="/test" component={AppTest} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
