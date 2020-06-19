import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import GroupPage from './pages/Group'
import GroupsPage from './pages/Groups'
import Layout from './components/layout/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/group" exact component={GroupsPage} />
          <Route path="/group/:id" component={GroupPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
