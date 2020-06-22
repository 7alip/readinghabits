import React from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'

import DrawerLayout from './components/layout/DrawerLayout'
import Layout from '../components/layout/Layout'
import MyGroupsPage from './pages/_MyGroups'
import HomePage from './pages/_Home'
import GroupsPage from './pages/_Groups'
import GroupPage from './pages/_Group'

const AppTest = () => {
  let { path } = useRouteMatch()

  return (
    <Layout>
      <DrawerLayout>
        <Switch>
          <Route exact path={path} component={HomePage} />
          <Route path={`${path}/group`} component={MyGroupsPage} />
          <Route exact path={`${path}/groups`} component={GroupsPage} />
          <Route path={`${path}/groups/:id`} component={GroupPage} />
        </Switch>
      </DrawerLayout>
    </Layout>
  )
}

export default AppTest
