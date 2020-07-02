import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'

const CustomRoute = ({ isPrivate, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (isPrivate && !isLoggedIn)
    return (
      <Route
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/hesap',
              state: { from: location },
            }}
          />
        )}
      />
    )

  return <Route {...rest} />
}

CustomRoute.propTypes = {
  isPrivate: PropTypes.bool,
  match: PropTypes.object,
}

export default CustomRoute
