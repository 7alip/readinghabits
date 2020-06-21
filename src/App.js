import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import IndexPage from './pages/Index'
import HomePage from './pages/Home'
import ProfilePage from './pages/Profile'
import GroupPage from './pages/Group'
import GroupsPage from './pages/Groups'
import NotFoundPage from './pages/404'
import SettingsPage from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/group" component={GroupsPage} />
        <Route exact path="/group/:id" component={GroupPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
