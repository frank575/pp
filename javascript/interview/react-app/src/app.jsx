import React from 'react'
import { Header } from './components/header'
import { Route, Switch } from 'react-router'
import { Login } from './pages/login'
import { Home } from './pages/home'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Login" component={Login} />
      </Switch>
    </div>
  )
}

export default App
