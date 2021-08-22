import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../use-auth'

export { PrivateRoute }

const PrivateRoute = ({...routeProps}) => {
  const { auth } = useAuth()

  if (!auth) return <Redirect to="/login" />

  return <Route {...routeProps} />
}
