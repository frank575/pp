import React from 'react'
import { Header } from './components/header'
import { Route, Switch } from 'react-router'
import { Login } from './pages/login'
import { Home } from './pages/home'
import { AuthProvider } from './use-auth'
import { PrivateRoute } from './components/private-route'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
        </Switch>
      </div>
    </AuthProvider>
  )
}

export default App
