import React, { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router'

export { AuthProvider, useAuth }

const authContext = createContext(null)

const authService = () => {
  const history = useHistory()
  const [auth, setAuth] = useState(false)

  const login = (account) => new Promise((resolve) => {
    setTimeout(() => {
      if (account === 'user') {
        setAuth(true)
        return resolve(true)
      }
      return resolve(false)
    }, 1500)
  })

  const logout = () => {
    setAuth(false)
    history.push('/')
  }

  return {
    auth,
    login,
    logout,
  }
}

const AuthProvider = ({ children }) => {
  return <authContext.Provider value={authService()}>{children}</authContext.Provider>
}

const useAuth = () => useContext(authContext)
