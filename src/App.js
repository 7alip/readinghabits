import React, { useState, createContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './components/layout/Layout'
import HomePage from './pages/Home'
import MyGroupsPage from './pages/MyGroups'
import SingleGroupPage from './pages/SingleGroup'
import GroupsPage from './pages/Groups'
import NotFoundPage from './pages/404'

export const AuthContext = createContext()

function App() {
  const [userId, setUserId] = useState()

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/groups" component={GroupsPage} />
            <Route exact path="/groups/me" component={MyGroupsPage} />
            <Route exact path="/groups/:id" component={SingleGroupPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
